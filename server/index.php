<?php

use Workerman\Worker;
use PHPSocketIO\SocketIO;

require __DIR__ . '/vendor/autoload.php';
require  'Admin.php';
require  'Client.php';

$io = new SocketIO(3030);
$admin = new Admin();
$client = new Client();

$io->on('connection', function($socket) use($io, $admin, $client){
    //--CLIENT
    $socket->on('client-add drone', function () use($socket, $admin, $client) {
        $droneId = $client->genrateCode($socket->id);
        $socket->emit('client-drone code',array(
            'code'=> $droneId
        ));
        $client->set($droneId,$socket->id);
    });

    //--ADMIN
    $socket->on('admin-drone code', function ($droneId) use($io, $socket, $admin, $client) {
        $clientId = $client->get($droneId);
        $result = $admin->find($clientId);
        if($clientId!==$result->client){
            $admin->set($socket->id, $clientId);
            $socket->emit('admin drone added', true);
            $io->to($clientId)->emit('client-drone added',true);
        }
        else{
            $socket->emit('admin-error','Drone not available.');
        }
    });

    $socket->on('disconnect', function () use($io, $socket, $admin, $client) {
          $isClient = $client->detach($socket->id);
          $clientId = $admin->get($socket->id);
          if($isClient){
              $result = $admin->find($socket->id);
              if(!empty($result->admin)){
                  $admin->detach($result->admin);
                  $io->to($result->admin)->emit('admin-client disconnected');
              }
          }else if(!empty($clientId)) {
              $result = $admin->find($clientId);
              if (!empty($result->admin)) {
                  $admin->detach($result->admin);
                  $client->detach($clientId);
                  $io->to($clientId)->emit('client-admin disconnected');
              }
          }
    });
});

Worker::runAll();
