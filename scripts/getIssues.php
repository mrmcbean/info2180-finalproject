<?php
session_start();
include 'database.php';
if (isset($_GET["all"])) {
    if ($_GET["all"] == 'true') {
        if ($_GET["mine"] == 'true') {
            $id = $_SESSION['id'];
            $sql = "SELECT * FROM issues WHERE assigned_to = '$id'";
        } else if ($_GET["fil"] == "all") {

            $sql = "SELECT * FROM issues";
        } else {
            $fil = $_GET["fil"];
            $sql = "SELECT * FROM issues WHERE status = '$fil'";
        }
        $results = $conn->query($sql);
        $resp = ' <table id="issueTable">
            <thead>
                <tr>
                    <th class="left-align thborder">Title</th>
                    <th class="left-align">Type</th>
                    <th class="left-align">Status</th>
                    <th class="left-align">Assigned To</th>
                    <th class="left-align thborder-right">Created</th>
                </tr>
            </thead>';

        while ($row = $results->fetch()) {
            $id = $row['assigned_to'];
            $sql = "SELECT * FROM users WHERE id = $id; ";
            $res = $conn->query($sql);
            $assigned = $res->fetch();
            $resp = $resp . " <tr>
                <td id='issue' class='left-align bold'>" . '#' . $row["id"] . ' ' . "<a href='#' onclick = 'getIssues(" . $row["id"] . ")'>" . $row["title"] . "</a></td>
                <td class='left-align'>" . $row["type"] . "</td>
                <td class='open upper left-align padding-10 statusType'>" . $row["status"] . "</td>
                <td class='left-align'>" . $assigned["firstname"].' '.$assigned['lastname'] . "</td>
                <td class='left-align padding-8'>" . date('o-m-d', strtotime($row["created"])) . "</td>
            </tr>";
        }
        $resp = $resp . '</table>';
        echo $resp;
    } else {
        $id = $_GET['id'];
        $sql = "SELECT * FROM issues WHERE id = $id; ";
        $results = $conn->query($sql);
        while ($row = $results->fetch()) {
            $id = $row["id"];
            $title = $row['title'];
            $description = $row['description'];
            $type = $row['type'];
            $priority = $row['priority'];
            $status = $row['status'];
            $id = $row['assigned_to'];
            $sql = "SELECT * FROM users WHERE id = $id; ";
            $res = $conn->query($sql);
            $assigned = $res->fetch();
            $assignedTo = $assigned['firstname'].' '. $assigned['lastname'];
            $created_by = $row['created_by'];
            $created = date("F j, o", strtotime($row['created'])) . " at" . date(" g:iA", strtotime($row['created']));
            $updated = date("F j, o", strtotime($row['updated'])) . " at" . date(" g:iA", strtotime($row['updated']));
            echo " <div id='floatleft'>
            <h1> $title </h1>
            <p> Issue : $id  </p>
    
            <p class='description'> $description  </p>
    
            <ul>
                <li> Issue created on $created by $created_by </li>
                <li> Last updated on $updated </li>
            </ul>
        </div>
    
        <div id='floatright'>
            <div id='border'>
                <h3>Assigned To</h3>
                <p> $assignedTo </p>
    
                <h3>Type:</h3>
                <p> $type </p>
    
                <h3>Priority:</h3>
                <p> $priority </p>
    
                <h3>Status:</h3>
                <p class='margin-bottom'> $status </p>
            </div>
    
            <div id='block'>
                <button id='closedbtn' onclick = 'changeStatus(" . $row["id"] . "," . '"Closed"' . ")'>Mark as Closed</button>
                <button id='inprogressbtn' onclick = 'changeStatus(" . $row["id"] . "," . '"In Progress"' . ")'>Mark In Progress</button>
            </div>
        </div>";
            break;
        }
    }
} else {
    echo "<h3>No Data</h3>";
}
