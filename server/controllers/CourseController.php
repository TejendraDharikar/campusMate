<?php
require_once __DIR__ . "/../models/CourseModel.php";

class CourseController{
  public static function index(){
    echo json_encode(CourseModel::getall());
  }

  public static function store(){
    $data =json_decode(file_get_contents("php://input"),true);
    $success=CourseModel::create($data);
    echo json_encode(["success=>$success"]);
  }
}

// add update and delete methods
?>