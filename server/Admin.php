<?php
/**
 * Created by IntelliJ IDEA.
 * User: ashishmishra
 * Date: 6/15/2018 AD
 * Time: 21:20
 */

class Admin {
    private $clients;

    public function __construct()
    {
        $this->clients = array();
    }

    function find($ClientId){
        $result = (object)[
            'client' => '',
            'admin' => '',
        ];
        foreach ($this->clients as $key => $value) {
            if ($ClientId == $value) {
                $result->client = $value;
                $result->admin = $key;
            }
        }
        return $result;
    }

    function set($adminId,$clientId)
    {
        echo 'New client added: - DRONE: '.$clientId;
        return  $this->clients[$adminId] = $clientId;
    }

    function get($adminId)
    {
        if (isset($this->clients[$adminId])) {
            return $this->clients[$adminId];
        }
        return false;
    }

    function detach($socketId)
    {
//        echo 'in admin 3rd';
        $result = false;
        foreach ($this->clients as $key => $value) {
            if ($socketId == $key) {
                $result = true;
//                echo 'in admin 4th';
                unset($this->clients[$key]);
            }
        }
        return $result;
    }
}
