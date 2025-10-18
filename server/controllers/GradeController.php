<?php
require_once __DIR__ . "/../models/GradeModel.php";
require_once __DIR__ . '/../middleware/converterMiddleware.php';

class GradeController {

  // 🔍 Get grades by student (via user_id)
  public static function studentGrades() {
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['student_id'] ?? null;

    if (!$user_id) {
      echo json_encode(["error" => "Missing user_id"]);
      return;
    }

    $student_id = ConverterMiddleware::toStudentId($user_id);
    if (!$student_id) {
      echo json_encode(["error" => "No student found for user_id $user_id"]);
      return;
    }

    $grades = GradeModel::getByStudent($student_id);
    echo json_encode($grades);
  }

  // 📤 Get grades by teacher (via user_id)
  public static function teacherGrades() {
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['teacher_id'] ?? null;

    if (!$user_id) {
      echo json_encode(["error" => "Missing user_id"]);
      return;
    }

    $teacher_id = ConverterMiddleware::toTeacherId($user_id);
    if (!$teacher_id) {
      echo json_encode(["error" => "No teacher profile found for user_id $user_id"]);
      return;
    }

    $grades = GradeModel::allGradesByTeacher($teacher_id);
    echo json_encode($grades);
  }

  // 📥 Add a grade
  public static function addGrade() {
    $data = json_decode(file_get_contents("php://input"), true);

    $student_id = $data['student_id'] ?? null;
    $course_id = $data['course_id'] ?? null;
    $grade = $data['grade'] ?? null;
    $remarks = $data['remarks'] ?? null;

    if (!$student_id || !$course_id || !$grade || !$remarks) {
      echo json_encode(["error" => "Missing required fields"]);
      return;
    }

    $success = GradeModel::add($student_id, $course_id, $grade,$remarks);
    echo json_encode(["success" => $success]);
  }

  

  // // ✏️ Update grade
  // public static function update() {
  //   $data = json_decode(file_get_contents("php://input"), true);
  //   $grade_id = $data['grade_id'] ?? null;
  //   $grade = $data['grade'] ?? null;
  

  //   if (!$grade_id || !$grade) {
  //     echo json_encode(["error" => "Missing grade_id or grade"]);
  //     return;
  //   }

  //   $success = GradeModel::update($grade_id, $grade);
  //   echo json_encode(["success" => $success]);
  // }

  // // ❌ Delete grade
  // public static function destroy() {
  //   parse_str($_SERVER['QUERY_STRING'], $params);
  //   $grade_id = $params['grade_id'] ?? null;

  //   if (!$grade_id) {
  //     echo json_encode(["error" => "Missing grade_id"]);
  //     return;
  //   }

  //   $success = GradeModel::delete($grade_id);
  //   echo json_encode(["success" => $success]);
  // }
}

?>