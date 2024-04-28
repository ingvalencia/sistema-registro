<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include 'database.php';

$userId = isset($_GET['id']) ? $_GET['id'] : die();

$query = "DELETE FROM usuarios WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $userId);

if ($stmt->execute()) {
    echo json_encode(array('message' => 'User deleted successfully.'));
} else {
    echo json_encode(array('message' => 'Failed to delete user.'));
}
?>
