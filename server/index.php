<?php

use Workerman\Worker;
use PHPSocketIO\SocketIO;
use Hashids\Hashids;

require __DIR__ . '/vendor/autoload.php';

class Store {
    private $drones;
    private $admins;

    public function __construct()
    {
        $this->drones = array();
        $this->admins = array();
    }

    function genrateCode($socketId){
        $hashId = new Hashids($socketId,3,"DRNEzne123456789");
        return $hashId->encode(1);
    }

    function add($droneId,$socketId)
    {
        echo 'New drone added: - DRONE: '.$droneId;
        return  $this->drones[$droneId] = $socketId;
    }

    function get($droneId)
    {
        return  $this->drones[$droneId];
    }

    function remove($socketId)
    {
        foreach($this->drones as $key => $value) {
            if($socketId==$value) {
                $this->turnOff($key);
                unset($this->drones[$key]);
            }
        }
        return sizeof($this->drones);
    }

    ///-- admin
    function turnOn($droneId)
    {
        array_push($this->admins, $droneId);
        return sizeof($this->admins);
    }
    function turnOff($droneId)
    {
        unset($this->admins[$droneId]);
        return sizeof($this->admins);
    }
    function isBusy($droneId)
    {
        print_r($this->admins);
        echo array_search($droneId, $this->admins);
        return array_search($droneId, $this->admins);
    }
}

$io = new SocketIO(3030);
$store = new Store();

$io->on('connection', function($socket) use($io,$store){
    //--CLIENT
    $socket->on('add drone', function () use($socket, $store) {
        $droneId = $store->genrateCode($socket->id);
        $socket->emit('drone code',array(
            'code'=> $droneId
        ));
    });

    //--ADMIN
    $socket->on('admin code', function ($droneId) use($io,$socket, $store) {
        $isBusy = $store->isBusy($droneId);
        if($isBusy) {
            $socket->emit('admin error',
                'Drone busy, please refresh your drone.');
        }else{
            echo 'Turn on : '.$store->turnOn($droneId);
            $store->add($droneId,$socket->id);
            $socketId = $store->get($droneId);
            $io->socket($socketId)->emit('client drone added', true);
            $socket->emit('admin drone added', true);
        }
    });

    $socket->on('disconnect', function () use($socket, $store) {
        echo $store->remove($socket->id);
    });
});

Worker::runAll();
