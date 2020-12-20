<?php
session_start();
$conn = null;

require 'database.php';

if (isset($_POST["email"]) && isset($_POST["password"])) {
    $email = $_POST["email"];
    $userpassword = $_POST["password"];


    $sql = "SELECT * FROM Users WHERE email = '$email';";
    
    
    $result = $conn->query($sql);
    while ($row = $result->fetch()) {
        $pass =  $row["password"];
        if (password_verify($userpassword,$pass)) {
            $_SESSION['user'] = $email;
            $_SESSION['userFirstname'] = $row["firstname"];
            $_SESSION['userLastname'] = $row["lastname"];
            $_SESSION['id'] = $row['id'];
            echo 'Success';
        } else {
            echo 'Failed';
        }
        break;
    }
}else{
    echo 'Failed';
}