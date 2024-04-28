<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include 'database.php';  // Incluye tu archivo de conexión a la base de datos.

$query = "SELECT id, username, email FROM usuarios";
$stmt = $conn->prepare($query);
$stmt->execute();

$num = $stmt->rowCount();

if ($num > 0) {
    $users_arr = array();
    $users_arr['data'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $user_item = array(
            'id' => $id,
            'username' => $username,
            'email' => $email
        );
        array_push($users_arr['data'], $user_item);
    }

    echo json_encode($users_arr);
} else {
    echo json_encode(array('message' => 'No users found.'));
}
?>
