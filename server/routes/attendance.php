<?php
require_once("../middleware/CorsMiddleware.php");
require_once("../config/db.php");

$input = json_decode(file_get_contents("php://input"), true);
$student_id = $input['student_id'] ?? null;

if (!$student_id) {
  echo json_encode(["error" => "Missing student_id"]);
  exit;
}

$query = "
  SELECT a.date, c.title AS course, a.status
  FROM attendance a
  JOIN courses c ON a.course_id = c.id
  WHERE a.student_id = ?
  ORDER BY a.date DESC
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $student_id);
$stmt->execute();
$result = $stmt->get_result();

$records = [];

while ($row = $result->fetch_assoc()) {
  $records[] = [
    "date" => $row['date'],
    "course" => $row['course'],
    "status" => ucfirst($row['status']),
  ];
}

echo json_encode($records);
$stmt->close();
$conn->close();
?>

