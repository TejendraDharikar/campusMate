<?php
class StudentModel{
public static function getStudentsByCourse($course_id){
global $conn;
$stmt=$conn->prepare("SELECT 
sc.student_id AS student_id,
  s.name AS student_name,
  c.title AS course_name,
  c.id AS course_id
FROM students_courses sc
JOIN students s ON sc.student_id = s.id
JOIN courses c ON sc.course_id = c.id
WHERE c.id = ?
ORDER BY c.title, s.name;
");
$stmt->bind_param("i",$course_id);
    $stmt->execute();
    $result = $stmt->get_result();

  $data = [];
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  return $data;
}
}
?>