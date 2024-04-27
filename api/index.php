<?php
header('Access-Control-Allow-Origin: *'); // Permitir acceso desde cualquier origen
header('Content-Type: application/json; charset=UTF-8'); // Establecer tipo de contenido como JSON
header('Access-Control-Allow-Methods: POST'); // Permitir solo métodos POST
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$host = 'localhost';
$db_name = 'sistema_usuarios';
$db_user = 'root';
$db_password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully"; 
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// Manejar peticiones POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {
        $query = "INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $conn->prepare($query);

        // Sanitizar y vincular datos
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
?>
