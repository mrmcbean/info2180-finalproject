<?php 
session_start();


if(!isset($_SESSION['user']) || $_SESSION['user']==null ){
    include "login.html";
}else{
    include "bugme.html";
}
?>