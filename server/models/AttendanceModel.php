<?php

class AttendanceModel {
  public static function getByStudent($student_id) {
    global $conn;

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

    $stmt->close();
    return $records;
  }
}
?>