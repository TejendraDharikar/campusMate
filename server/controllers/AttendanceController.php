<?php
require_once __DIR__ . '/../models/AttendanceModel.php';

class AttendanceController {

  public static function getAllStudentsAttendance(){
    $records = AttendanceModel::fetchAllStudent();
      echo json_encode($records);
  }



  public static function getStudentAttendance() {
  global $conn;

  $input = json_decode(file_get_contents("php://input"), true);
  $user_id = $input['user_id'] ?? null; 

  if (!$user_id) {
    echo json_encode(["error" => "Missing user_id"]);
    exit;
  }

  // Resolve student_id from user_id
  $stmt = $conn->prepare("SELECT id FROM students WHERE user_id = ?");
  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();
  $student = $result->fetch_assoc();
  $stmt->close();

  if (!$student) {
    echo json_encode(["error" => "No student found for user_id $user_id"]);
    exit;
  }

  $student_id = $student['id'];

  // Fetch attendance
  $records = AttendanceModel::getByStudent($student_id);
  echo json_encode($records);
}


  //  adding attendence part

  public static function addStudentAttendance(){
    $data = json_decode(file_get_contents("php://input"),true);

    $student_id=$data['student_id'] ?? null;
    $course_id = $data['course_id'] ?? null;
    $date = $data['date'] ?? null;
    $status = $data['status'] ?? null;

     if (!$student_id || $course_id || $date || $status) {
      echo json_encode(["error" => "Missing required fields"]);
      exit;
    }

      $result = AttendanceModel::addByStudent($student_id,$course_id,$date,$status);
      echo json_encode($result);
  }




  public static function updateStudentAttendance(){
    $data= json_decode(file_get_contents("php://input"),true);
    $id = $data['id'] ?? null;
    $status = $data['status'] ?? null;

    if (!$id || !$status){
      echo json_encode(["error"=>"Missing id or status"]);
      exit;
    }

    $result = AttendanceModel::updateById($id,$status);
    echo json_encode($result);
} 



 public static function deleteStudentAttendance(){
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