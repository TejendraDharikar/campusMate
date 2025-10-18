<?php
require_once __DIR__ . "/../config/db.php";

class ConverterMiddleware{
  public static function toTeacherId($user_id){
    global $conn;
    $stmt = $conn->prepare("SELECT id FROM teacher_profiles WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    return $result['id'] ?? null;
  }

  public static function toStudentId($user_id){
    global $conn;
    $stmt = $conn->prepare("SELECT id FROM students WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    return $result['id'] ?? null;
  }
}
?>