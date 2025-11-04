<?php

class CourseModel
{

  // modeling function haru yaha xa 

  public static function getall($teacher_id)
  {
    global $conn;

    $stmt = $conn->prepare("SELECT 
    sc.id AS student_id,
    s.name AS student_name,
    s.email,
    c.id AS course_id,
    c.title AS course_name
FROM students_courses sc
JOIN courses c ON sc.course_id = c.id
JOIN students s ON sc.student_id = s.id
WHERE c.teacher_id = ? ;");
    $stmt->bind_param("i", $teacher_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);


    return $result;
  }

  public static function getByStudentId($student_id)
  {
    global $conn;
    $stmt = $conn->prepare("SELECT 
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
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    error_log("student_id: " . $student_id);
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
  }


  public static function getById($id)
  {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM students_courses where id=? ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    return $result ?: ["error" => "course data not found in database"];
  }



  public static function add($student_id, $course_id)
  {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO students_courses(student_id,course_id) VALUES (?,?)");
    $stmt->bind_param("ii", $student_id, $course_id);
    return $stmt->execute();
  }

  public static function update($id, $student_id, $course_id)
  {
    global $conn;
    $stmt = $conn->prepare("UPDATE students_courses SET student_id=?,course_id=? WHERE id=?");
    $stmt->bind_param("iii", $student_id, $course_id, $id);
    $success = $stmt->execute();
    $stmt->close();
    return $success ? ["success" => true] : ["error" => "Update failed"];
  }


  public static function delete($student_id)
  {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM students_courses WHERE id = ?");
    $stmt->bind_param("i", $student_id);
    return $stmt->execute();
  }
}
?>