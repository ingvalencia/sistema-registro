<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include 'database.php';

$data = json_decode(file_get_contents("php://input"));

// Asegúrate de que todos los campos necesarios están presentes
if (!empty($data->id) && isset($data->username) && isset($data->email)) {
    // Prepare the query
    $query = "UPDATE usuarios SET username = :username, email = :email WHERE id = :id";
    $stmt = $conn->prepare($query);

    // Correct way to bind parameters
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    $id = $data->id;

    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    
    // Execute the statement and handle errors
    try {
        $stmt->execute();
        echo json_encode(['message' => 'User updated successfully.']);
    } catch (PDOException $e) {
        // Check for duplicate email error
        if ($e->errorInfo[1] == 1062) {
            echo json_encode(['message' => 'Failed to update user: Email already exists.']);
        } else {
            echo json_encode(['message' => 'Failed to update user.', 'error' => $e->getMessage()]);
        }
    }
} else {
    echo json_encode(['message' => 'Incomplete data.']);
}
?>
