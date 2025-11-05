<?php
require_once __DIR__ . '/../models/StudentModel.php';
class StudentController{
  public static function getStudentsByCourse(){
 $input = json_decode(file_get_contents("php://input"), true);
    $course_id = $input['courseId'] ?? null;
    if (!$course_id) {
      echo json_encode(["error" => "Missing course Id"]);
      exit;
    }
    $record = StudentModel::getStudentsByCourse($course_id);
    echo json_encode($record);
  }
}

?>