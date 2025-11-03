<?php
require_once __DIR__ . '/../models/DashboardModel.php';
require_once __DIR__ . '/../middleware/converterMiddleware.php';

class DashboardController{

  public static function getCount(){

    $totalstat=DashboardModel::getTotalStats();
   

    echo json_encode([
     "success"=>$totalstat
    ]);

  }

   public static function getStatsByTeacher() {
      $data=json_decode(file_get_contents("php://input"),true);
      $user_id=$data['teacher_id'] ?? null;

      if (!$user_id) {
      echo json_encode(["error" => "Missing user_id"]);
      return;
    }

    $teacher_id = ConverterMiddleware::toTeacherId($user_id);
    if (!$teacher_id) {
      echo json_encode(["error" => "No teacher profile found for user_id $user_id"]);
      return;
    }

    $stats = DashboardModel::getStudentStatsByTeacher($teacher_id);
    echo json_encode($stats);
  }

}
?>