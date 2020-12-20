<?php
include 'database.php';
if (isset($_POST['status']) && isset($_POST['id'])) {
    $id = $_POST["id"];
    $status = $_POST["status"];
    $sql = " UPDATE issues SET status = '$status' WHERE id = $id;";
    $results = $conn->exec($sql);
    echo "Success";
} else {
    echo "Failed";
    
}
