<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include 'database.php';

$conn = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Verifica si la solicitud es POST (registro)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {
        $query = "INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":username", htmlspecialchars(strip_tags($data->username)));
        $stmt->bindParam(":email", htmlspecialchars(strip_tags($data->email)));
        $stmt->bindParam(":password", password_hash(htmlspecialchars(strip_tags($data->password)), PASSWORD_DEFAULT));

        if($stmt->execute()) {
            echo json_encode(array('message' => 'User registered successfully.'));
        } else {
            echo json_encode(array('message' => 'Failed to register user.'));
        }
    } else {
        echo json_encode(array('message' => 'Incomplete data.'));
    }
}
// Verifica si la solicitud es GET (inicio de sesión)
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $username = isset($_GET['username']) ? $_GET['username'] : die();
    $password = isset($_GET['password']) ? $_GET['password'] : die();

    $query = "SELECT id, username, password FROM usuarios WHERE username = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":username", $username);
    $stmt->execute();
    $num = $stmt->rowCount();

    if ($num > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $id = $row['id'];
        $username = $row['username'];
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            echo json_encode(array("message" => "Successful login.", "id" => $id, "username" => $username));
        } else {
            echo json_encode(array("message" => "Login failed. Password does not match."));
        }
    } else {
        echo json_encode(array("message" => "Login failed. User not found."));
    }
} else {
    echo json_encode(array("message" => "Method not allowed."));
}
?>
