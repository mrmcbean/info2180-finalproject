<?php 
session_start();
$_SESSION['user'] = null;
$_SESSION['userFirstname'] = null;
$_SESSION['userLastname'] = null;
$_SESSION['id'] = null;
header("Location: ../index.php");
?>