<?php
session_start();
    require 'database.php';

    if (isset($_POST["title"]) &&
        isset($_POST["desc"]) &&
        isset($_POST["priority"]) &&
        isset($_POST["type"]) &&
        isset($_POST["assignedto"])) {

        $title = $_POST["title"];
        $desc = $_POST["desc"];
        $priority = $_POST["priority"];
        $type = $_POST["type"];
        $assignedto = $_POST["assignedto"];
        $id = $_SESSION["id"];
        
        $sql = "INSERT INTO Issues (title,description,type,priority,status,assigned_to,created_by,created,updated) VALUES 
          (
          '$title',
          '$desc',
          '$type',
          '$priority',
          'Open',
          '$assignedto',
          '$id',
           CURDATE(),
           CURDATE()
           );";
        $result = $conn->exec($sql);
            echo 'Success';
        }else{
            echo 'Failed';
        }
?>