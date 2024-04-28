<?php
$host = 'localhost';
$db_name = 'sistema_usuarios';
$db_user = 'root';
$db_password = '';

try {
    // Crear una conexión PDO
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $db_user, $db_password);
    // Configurar el modo de error de PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("ERROR: No se pudo conectar. " . $e->getMessage());
}
?>
