<?php
/**
 * Created by IntelliJ IDEA.
 * User: ashishmishra
 * Date: 6/15/2018 AD
 * Time: 21:14
 */
use Hashids\Hashids;

class Client {
    private $drones;

    public function __construct()
    {
        $this->drones = array();
    }

    function genrateCode($socketId){
        $hashId = new Hashids($socketId,3,"DRNEzne123456789");
        return $hashId->encode(1);
    }

    function set($droneId,$socketId)
    {
        echo 'New drone added: - DRONE: '.$droneId;
        return  $this->drones[$droneId] = $socketId;
    }

    function get($droneId)
    {
        if (isset($this->drones[$droneId])) {
            return $this->drones[$droneId];
        }
        return false;
    }

    function detach($socketId)
    {
        $result = false;
        foreach ($this->drones as $key => $value) {
            if ($socketId == $value) {
                $result = true;
                unset($this->drones[$key]);
            }
        }
        return $result;
    }
}
