<?php
require_once __DIR__ . '/../models/AttendanceModel.php';

class AttendanceController {
  public static function getStudentAttendance() {
    header("Content-Type: application/json");

    $input = json_decode(file_get_contents("php://input"), true);
    $student_id = $input['student_id'] ?? null;

    if (!$student_id) {
      echo json_encode(["error" => "Missing student_id"]);
      exit;
    }

    $records = AttendanceModel::getByStudent($student_id);
    echo json_encode($records);
  }
}

?>