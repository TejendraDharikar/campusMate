<?php

class CourseModel{
  
// modeling function haru yaha xa 

  public static function getall($teacher_id){
    global $conn;
error_log("🔍 Querying with teacher_id: " . $teacher_id);

    $stmt=$conn->prepare("SELECT 
    sc.id AS student_id,
    s.name AS student_name,
    s.email,
    c.id AS course_id,
    c.title AS course_name
FROM students_courses sc
JOIN courses c ON sc.course_id = c.id
JOIN students s ON sc.student_id = s.id
WHERE c.teacher_id = ? ;");
    $stmt->bind_param("i",$teacher_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    
    error_log("🔍 Query returned " . count($result) . " rows");
    error_log("🔍 Result: " . json_encode($result));
    
    return $result;
  }

    public static function getById($student_id){
    global $conn;
    $stmt=$conn->prepare("SELECT 
  c.title AS course_name,
  c.description,
  c.credits,
  tp.name AS teacher_name,
  tp.department,
  sc.enrolled_at
FROM students_courses sc
JOIN courses c ON sc.course_id = c.id
JOIN teacher_profiles tp ON c.teacher_id = tp.id
WHERE sc.student_id = ?
ORDER BY sc.enrolled_at DESC");
    $stmt->bind_param("i",$student_id);
    $stmt->execute();
    error_log("📥 student_id: " . $student_id);
     return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

  }

  // public static function create($data){
  //   global $conn;
  //   $stmt=$conn->prepare("INSERT INTO courses(title,description,credits,teacher_id) VALUES (?,?,?,?)");
  //   $stmt->bind_param("ssii",$data['title'], $data['description'], $data['credits'], $data['teacher_id']);
  //   return $stmt->execute();
  // }
  // add update and delete method here ok
  
}


?>