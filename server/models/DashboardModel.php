<?php
class DashboardModel{

  public static function getTotalStats(){
  global $conn;
  $stmt1=$conn->prepare('SELECT COUNT(*) AS total FROM students');
  $stmt1->execute();
  $stmt1->bind_result($studentCount);
  $stmt1->fetch();
  $stmt1->close();
  
  $stmt2=$conn->prepare('SELECT COUNT(*) AS total FROM courses');
  $stmt2->execute();
  $stmt2->bind_result($courseCount);
  $stmt2->fetch();
  $stmt2->close();


  $stmt3=$conn->prepare('SELECT COUNT(*) AS total FROM attendance');
  $stmt3->execute();
  $stmt3->bind_result($attendanceCount);
  $stmt3->fetch();
  $stmt3->close();
 
 
  return[
 'studentCount' => (int)$studentCount,
      'courseCount' => (int)$courseCount,
      'attendanceCount' => (int)$attendanceCount

  ];
  }



   public static function getStudentStatsByTeacher($teacherId) {
        global $conn;

        // for students
    $stmt1 = $conn->prepare("
            SELECT COUNT(DISTINCT sc.student_id)
            FROM students_courses sc
         JOIN courses c ON sc.course_id = c.id          
            WHERE c.teacher_id = ? 
        ");
        $stmt1->bind_param("i", $teacherId);
        $stmt1->execute();
        $stmt1->bind_result($studentCount);
        $stmt1->fetch();
        $stmt1->close();
        
    // for courses
        $stmt2 = $conn->prepare("SELECT COUNT(DISTINCT sc.course_id)
            FROM students_courses sc
         JOIN courses c ON sc.course_id = c.id          
            WHERE c.teacher_id = ? ");
        $stmt2->bind_param("i", $teacherId);
        $stmt2->execute();
        $stmt2->bind_result($courseCount);
        $stmt2->fetch();
        $stmt2->close();
      
  //  for attendence
        $stmt3 = $conn->prepare("
            SELECT COUNT(a.id)
            FROM attendance a
            JOIN courses c ON a.course_id = c.id
            WHERE c.teacher_id = ?
        ");
        $stmt3->bind_param("i", $teacherId);
        $stmt3->execute();
        $stmt3->bind_result($attendanceCount);
        $stmt3->fetch();
        $stmt3->close();
        

      return [
          'studentCount' => (int)$studentCount,
      'courseCount' => (int)$courseCount,
      'attendanceCount' => (int)$attendanceCount

      ];
    }


}
?>