<?php
require_once __DIR__ . "/../models/CourseModel.php";

class CourseController{
 
  public static function allStudentCourses(){
    
    echo json_encode(CourseModel::getall());
  }



 public static function studentCourses() {
    $input = json_decode(file_get_contents("php://input"), true);
    $student_id = $input['student_id'] ?? null;

    if (!$student_id) {
        echo json_encode(["error" => "Missing student id"]);
        return;
    }

    error_log("📥 Received student_id: " . $student_id);

    $result = CourseModel::getById($student_id);
    error_log("📤 Returning courses: " . json_encode($result)); // ✅ Add this

    echo json_encode($result);
}

  // public static function store(){
  //   $data =json_decode(file_get_contents("php://input"),true);
  //   $success=CourseModel::create($data);
  //   echo json_encode(["success=>$success"]);
  // }
}

// add update and delete methods
?>