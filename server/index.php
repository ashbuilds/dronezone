<?php

use Workerman\Worker;
use PHPSocketIO\SocketIO;

require __DIR__ . '/vendor/autoload.php';
require  'Admin.php';
require  'Client.php';

$eventsUrl = "../src/events.json";
$json = file_get_contents($eventsUrl);
$events = json_decode($json, TRUE);
$io = new SocketIO(3030);
$admin = new Admin();
$client = new Client();

$io->on('connection', function($socket) use($io, $admin, $client, $events){
    $addClient = function ($socketId) use($io, $admin, $client, $events){
        $droneId = $client->genrateCode($socketId);
        $io->to($socketId)->emit($events['CLIENT_SEND_CODE'],array(
            'code'=> $droneId
        ));
        $client->set($droneId,$socketId);
    };

    //--CLIENT
    $socket->on($events['CLIENT_ADD_DRONE'],function () use($socket, $addClient) {
        $addClient($socket->id);
    });

    //--ADMIN
    $socket->on($events['ADMIN_RECEIVE_CODE'], function ($droneId) use($io, $socket, $admin, $client, $events) {
        $clientId = $client->get($droneId);
        $result = $admin->find($clientId);
        if($clientId!==$result->client){
            $admin->set($socket->id, $clientId);
            $socket->emit($events['ADMIN_DRONE_ADDED'], true);
            $io->to($clientId)->emit($events['CLIENT_DRONE_ADDED'],true);
        }
        else{
            $socket->emit($events['ADMIN_ERROR'],'Drone not available.');
        }
    });

    $socket->on($events['ADMIN_DRONE_PLACE'], function ($type) use($io, $socket, $admin, $client, $events) {
        $clientId = $admin->get($socket->id);
        $io->to($clientId)->emit($events['CLIENT_DRONE_PLACE'],array(
            'type'=> $type,
        ));
    });

    $socket->on('disconnect', function () use($io, $socket, $admin, $client, $addClient, $events) {
          $isClient = $client->detach($socket->id);
          $clientId = $admin->get($socket->id);
          if($isClient){
              $result = $admin->find($socket->id);
              if(!empty($result->admin)){
                  $admin->detach($result->admin);
                  $io->to($result->admin)->emit($events['ADMIN_DISCONNECTED']);
              }
          }else if(!empty($clientId)) {
              $result = $admin->find($clientId);
              if (!empty($result->admin)) {
                  $admin->detach($result->admin);
                  $io->to($result->client)->emit($events['CLIENT_DISCONNECTED']);
              }
          }
    });
});

Worker::runAll();
