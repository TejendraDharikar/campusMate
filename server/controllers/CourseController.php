<?php
require_once __DIR__ . "/../models/CourseModel.php";

class CourseController{
 
public static function allStudentCourses() {
  header('Content-Type: application/json');

    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['teacher_id'] ?? null;

    if (!$user_id) {
        echo json_encode(["error" => "Missing teacher id"]);
        return;
    }

      $teacher_profile_id=CourseModel::getTeacherProfileId($user_id);
    
    if (!$teacher_profile_id) {
      error_log("no teacher profile found for user_id".$user_id);
        echo json_encode(["error" => "No teacher profile found for user"]);
        return;
    }

    //  Fetch student courses using teacher_profile.id
    $courses = CourseModel::getall($teacher_profile_id);
    echo json_encode($courses);
}



 public static function studentCourses() {
    $input = json_decode(file_get_contents("php://input"), true);
    $student_id = $input['student_id'] ?? null;

    if (!$student_id) {
        echo json_encode(["error" => "Missing student id"]);
        return;
    }

    $mystudent_id=CourseModel::getStudentId($student_id);

    if (!$mystudent_id) {
      error_log("no teacher profile found for user_id".$student_id);
        echo json_encode(["error" => "No teacher profile found for user"]);
        return;
    };


    $result = CourseModel::getById($mystudent_id);
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