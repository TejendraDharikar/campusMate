<?php
require_once("../middleware/CorsMiddleware.php");
require_once("../config/db.php");

$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Validate input
if (!$email || !$password) {
  http_response_code(400);
  echo json_encode(["message" => "Email and password are required"]);
  exit;
}

// Query user
$stmt = $conn->prepare("SELECT id, name, role, password_hash FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
  if (password_verify($password, $user['password_hash'])) {
    echo json_encode([
      "id" => $user['id'],
      "name" => $user['name'],
      "role" => $user['role']
    ]);
  } else {
    http_response_code(401);
    echo json_encode(["message" => "Invalid password"]);
  }
} else {
  http_response_code(404);
  echo json_encode(["message" => "User not found"]);
}
?>