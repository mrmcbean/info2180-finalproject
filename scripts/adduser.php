<?php
    require 'database.php';

    if (isset($_POST["email"]) &&
        isset($_POST["password"]) &&
        isset($_POST["firstname"]) &&
        isset($_POST["lastname"])) {

        $firstname = $_POST["firstname"];
        $lastname = $_POST["lastname"];
        $email = $_POST["email"];
        $password = password_hash($_POST["password"],PASSWORD_BCRYPT, array('cost' =>12));
        $sql = "INSERT INTO Users (firstname,lastname,password,email,date_joined) VALUES ('$firstname','$lastname','$password','$email',CURDATE());";
        $result = $conn->exec($sql);
            echo 'Success';
        }else{
            echo 'Failed';
        }
?>