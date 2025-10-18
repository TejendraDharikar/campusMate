<?php
class GradeModel{

  


  public static function allGradesByTeacher($teacher_id){
    global $conn;
    $stmt=$conn->prepare("SELECT 
    g.id AS grade_id,
    s.name AS student_name,
    c.title AS course_name,
    g.score,
    g.remarks,
    g.graded_at
    FROM grades g
    JOIN students s ON g.student_id = s.id
    JOIN courses c ON g.course_id = c.id
    WHERE c.teacher_id = ?
    ORDER BY g.graded_at DESC;");
    $stmt->bind_param("i",$teacher_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    return $result;
  }

   public static function getByStudent($student_id) {
    global $conn;
    $stmt = $conn->prepare("
      SELECT 
        c.title AS course_name,
        g.score,
        g.remarks,
        g.graded_at
      FROM grades g
      JOIN courses c ON g.course_id = c.id
      WHERE g.student_id = ?
      ORDER BY g.graded_at DESC
    ");
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
  }

  // ➕ Add grade
   public static function add($student_id, $course_id, $grade) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO grades (student_id, course_id, grade,remarks) VALUES ( ?, ?,?, ?)");
    $stmt->bind_param("iiss", $student_id, $course_id, $grade,$remarks);
    return $stmt->execute();
  }

    // ✏️ Update grade
  public static function update($grade_id, $grade, $remarks) {
    global $conn;
    $stmt = $conn->prepare("UPDATE grades SET grade = ?, remarks = ? WHERE id = ?");
    $stmt->bind_param("ssi", $grade, $remarks, $grade_id);
    return $stmt->execute();
  }

  // ❌ Delete grade
  public static function delete($grade_id) {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM grades WHERE id = ?");
    $stmt->bind_param("i", $grade_id);
    return $stmt->execute();
  }

}

?>