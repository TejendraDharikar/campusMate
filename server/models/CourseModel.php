<?php

class CourseModel{
  public static function getall(){
    global $conn;
    $stmt=$conn->prepare("SELECT * FROM courses");
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
  }

  public static function create($data){
    global $conn;
    $stmt=$conn->prepare("INSERT INTO courses(title,description,credits,teacher_id) VALUES (?,?,?,?)");
    $stmt->bind_param("ssii",$data['title'], $data['description'], $data['credits'], $data['teacher_id']);
    return $stmt->execute();
  }
  // add update and delete method here ok
  
}


?>