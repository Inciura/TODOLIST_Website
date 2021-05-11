<?php
session_start();

$conn = new mysqli('localhost', 'root', '', 'verify-user');




if (isset($_POST['save-btn'])) {
    
    $userId = $_SESSION["id"];
    $query = "INSERT INTO todoitems SET userId=?, itemText=?, completed=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('isi', $userId, );
    $result = $stmt->execute();

    if ($result) {
        $stmt->insert_id;
        $stmt->close();

        //header('location: index.php');
    } else {
        $_SESSION['error_msg'] = "Database error: Could not save a list";
    }
}