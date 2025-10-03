<?php
require_once("../middleware/CorsMiddleware.php");
require_once("../config/db.php");

$input = json_decode(file_get_contents("php://input"), true);
$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$role = $input['role'] ?? '';
$department = $input['department'] ?? '';
$enrollment_number = $input['enrollment_number'] ?? null;
$employee_id = $input['employee_id'] ?? null;

if (!$name || !$email || !$password || !$role || !$department) {
  http_response_code(400);
  echo json_encode(["message" => "Missing required fields"]);
  exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $password_hash, $role);

if (!$stmt->execute()) {
  http_response_code(500);
  echo json_encode(["message" => "Failed to create user"]);
  exit;
}

$user_id = $stmt->insert_id;

if ($role === 'student') {
  $stmt2 = $conn->prepare("INSERT INTO students (user_id, enrollment_number, department) VALUES (?, ?, ?)");
  $stmt2->bind_param("iss", $user_id, $enrollment_number, $department);
} elseif ($role === 'teacher') {
  $stmt2 = $conn->prepare("INSERT INTO teachers (user_id, employee_id, department) VALUES (?, ?, ?)");
  $stmt2->bind_param("iss", $user_id, $employee_id, $department);
} else {
  http_response_code(400);
  echo json_encode(["message" => "Invalid role"]);
  exit;
}

if (!$stmt2->execute()) {
  http_response_code(500);
  echo json_encode(["message" => "Failed to create profile"]);
  exit;
}

echo json_encode([
  "id" => $user_id,
  "name" => $name,
  "role" => $role
]);
?>