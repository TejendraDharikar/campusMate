<?php
require_once __DIR__ . "/../models/CourseModel.php";
require_once __DIR__ . "/../middleware/converterMiddleware.php";

class CourseController
{

  public static function allStudentCourses()
  {
    header('Content-Type: application/json');

    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['teacher_id'] ?? null;

    if (!$user_id) {
      echo json_encode(["error" => "Missing teacher id"]);
      return;
    }

    $teacher_id = ConverterMiddleware::toTeacherId($user_id);


    if (!$teacher_id) {
      error_log("no teacher profile found for user_id" . $user_id);
      echo json_encode(["error" => "No teacher profile found for user"]);
      return;
    }

    //  Fetch student courses using teacher_profile.id
    $courses = CourseModel::getall($teacher_id);
    echo json_encode($courses);
  }



  public static function studentCourses()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['student_id'] ?? null;

    if (!$user_id) {
      echo json_encode(["error" => "Missing student id"]);
      return;
    }

    $student_id = ConverterMiddleware::toStudentId($user_id);


    if (!$student_id) {
      error_log("no teacher profile found for user_id" . $student_id);
      echo json_encode(["error" => "No teacher profile found for user"]);
      return;
    };


    $result = CourseModel::getByStudentId($student_id);
    error_log(" Returning courses: " . json_encode($result));

    echo json_encode($result);
  }


  public static function getById()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'] ?? null;

    if (!$id) {
      echo json_encode(["error" => "missing id "]);
      exit;
    }

    $success = CourseModel::getById($id);
    echo json_encode($success);
  }


  public static function addCourse()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $student_id = $input['student_id'] ?? null;
    $course_id = $input['course_id'] ?? null;

    if (!$student_id || !$course_id) {
      echo json_encode(["error" => "Missing student_id or course_id"]);
      return;
    }

    $success = CourseModel::add($student_id, $course_id);
    echo json_encode($success);
  }



  public static function updateCourse()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'] ?? null;
    $student_id = $input['student_id'] ?? null;
    $course_id = $input['course_id'] ?? null;

    if (!$id || !$student_id || !$course_id) {
      echo json_encode(["error" => "Missing id or student_id or course_id"]);
      return;
    }

    $success = CourseModel::getById($id, $student_id, $course_id);
    echo json_encode($success);
  }

  public static function deleteCourse()
  {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $student_id = $params['student_id'] ?? null;

    if (!$student_id) {
      echo json_encode(["error" => "Missing id"]);
      return;
    }

    $success = CourseModel::delete($student_id);
    echo json_encode(["success" => $success]);
  }
}
