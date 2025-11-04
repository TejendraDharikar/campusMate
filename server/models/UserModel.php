<?php
class UserModel
{
    public static function createUser($name, $email, $password_hash, $role, $department)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, role, department) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $email, $password_hash, $role, $department);
        if (!$stmt->execute()) {
            return false;
        }
        return $stmt->insert_id;
    }

    public static function createStudentProfile($user_id, $name, $email, $department, $age)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO students (user_id,name,email, department,age) VALUES (?,?,?,?, ?)");
        $stmt->bind_param("issss", $user_id, $name, $email, $department, $age);
        if (!$stmt->execute()) {
            return false;
        }
        // Return student ID
        return $conn->insert_id;
    }

    public static function createTeacherProfile($user_id, $name, $department, $phone)
    {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO teacher_profiles (user_id,name, department,phone) VALUES (?,?,?, ?)");
        $stmt->bind_param("isss", $user_id, $name, $department, $phone);
        if (!$stmt->execute()) {
            return false;
        }
        // Return  teacher ID
        return $conn->insert_id;
    }

    public static function updateLinkedStudentId($user_id, $studentId)
    {
        global $conn;
        $stmt = $conn->prepare("UPDATE users SET linked_student_id = ? WHERE id = ?");
        $stmt->bind_param("ii", $studentId, $user_id);
        return $stmt->execute();
    }

    public static function updateLinkedTeacherId($user_id, $teacherId)
    {
        global $conn;
        $stmt = $conn->prepare("UPDATE users SET linked_teacher_id = ? WHERE id = ?");
        $stmt->bind_param("ii", $teacherId, $user_id);
        return $stmt->execute();
    }
}
?>