<?php
require_once __DIR__ . '/../models/AttendanceModel.php';
require_once __DIR__ . '/../middleware/converterMiddleware.php';

class AttendanceController {

  // 📋 Get all attendance records
  public static function getAllStudentsAttendance() {
    $records = AttendanceModel::fetchAllStudent();
    echo json_encode($records);
  }

  // 🔍 Get attendance for a specific student (via user_id)
  public static function getStudentAttendance() {
    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['user_id'] ?? null;

    if (!$user_id) {
      echo json_encode(["error" => "Missing user_id"]);
      exit;
    }

    $student_id = ConverterMiddleware::toStudentId($user_id);

    if (!$student_id) {
      echo json_encode(["error" => "No student found for user_id $user_id"]);
      exit;
    }

    $records = AttendanceModel::getByStudent($student_id);
    echo json_encode($records);
  }

  // ➕ Add attendance
  public static function addStudentAttendance() {
    $data = json_decode(file_get_contents("php://input"), true);
    
   error_log("Incoming payload: " . json_encode($data));

    $student_id = $data['student_id'] ?? null;
    $course_id = $data['course_id'] ?? null;
    $date = $data['date'] ?? null;
    $status = $data['status'] ?? null;

    if (!$student_id || !$course_id || !$date || !$status) {
      echo json_encode(["error" => "Missing required fields"]);
      exit;
    }

    $result = AttendanceModel::addByStudent($student_id, $course_id, $date, $status);
    echo json_encode($result);
  }

  // ✏️ Update attendance
  public static function updateStudentAttendance() {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    $status = $data['status'] ?? null;

    if (!$id || !$status) {
      echo json_encode(["error" => "Missing id or status"]);
      exit;
    }

    $result = AttendanceModel::updateById($id, $status);
    echo json_encode($result);
  }

  // ❌ Delete attendance
  public static function deleteStudentAttendance() {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    if (!$id) {
      echo json_encode(["error" => "Missing id"]);
      exit;
    }

    $result = AttendanceModel::deleteById($id);
    echo json_encode($result);
  }
}
?>