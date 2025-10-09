<?php

class AttendanceModel {

public static function fetchAllStudent() {
  global $conn;

  $query = "
    SELECT a.id, a.date, a.status, s.name AS student, c.title AS course
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    JOIN courses c ON a.course_id = c.id
    ORDER BY a.date DESC
  ";

  $stmt = $conn->prepare($query);
  $stmt->execute();
  $result = $stmt->get_result();

  $records = [];
  while ($row = $result->fetch_assoc()) {
    $records[] = [
      "id" => $row['id'],
      "date" => $row['date'],
      "student" => $row['student'],
      "course" => $row['course'],
      "status" => ucfirst($row['status']),
    ];
  }

  $stmt->close();
  return $records;
}

  public static function getByStudent($student_id) {
    global $conn;

    $query = "

      SELECT a.date, c.title AS course, a.status
      FROM attendance a
      JOIN courses c ON a.course_id = c.id 
      WHERE a.student_id= ?
      ORDER BY a.date DESC
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $records = [];
    while ($row = $result->fetch_assoc()) {
      $records[] = [
        "date" => $row['date'],
        "course" => $row['course'],
        "status" => ucfirst($row['status']),
      ];
    }

    $stmt->close();
    return $records;
  }


  // add attendance for student
    
  public static function addByStudent($student_id,$course_id,$date,$status){
    global $conn;

    $query="INSERT INTO attendance (student_id,course_id,date,status) VALUES (?,?,?,?)";
    $stmt = $conn->prepare($query);
    $stmt -> bind_param("iiss",$student_id,$course_id,$date,$status);

    if ($stmt->execute()){
      $insertedId = $stmt->insert_id;
      $stmt->close();
      return["success"=>true,"id"=>$insertedId];
    }else{
      $stmt->close();
      return["error"=>"insert failed"];
    }
  }



  public static function updateById($id,$status){
 global $conn;
  $stmt = $conn->prepare("UPDATE attendance SET status = ? WHERE id = ?");
  $stmt->bind_param("si", $status, $id);
  $success = $stmt->execute();
  $stmt->close();
  return $success ? ["success" => true] : ["error" => "Update failed"];

  }


public static function deleteById($id){
 global $conn;
  $stmt = $conn->prepare("DELETE FROM attendance WHERE id = ?");
  $stmt->bind_param("i", $id);
  $success = $stmt->execute();
  $stmt->close();
  return $success ? ["success" => true] : ["error" => "Delete failed"];
  }
  
}
?>