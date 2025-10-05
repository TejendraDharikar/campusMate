<?php

class UserModel {
    public static function createUser($name, $email, $password_hash, $role) {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $password_hash, $role);
        if (!$stmt->execute()) {
            return false;
        }
        return $stmt->insert_id;
    }

    public static function createStudentProfile($user_id, $enrollment_number, $department) {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO students (user_id, enrollment_number, department) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $user_id, $enrollment_number, $department);
        return $stmt->execute();
    }

    public static function createTeacherProfile($user_id, $employee_id, $department) {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO teacher_profiles (user_id, employee_id, department) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $user_id, $employee_id, $department);
        return $stmt->execute();
    }
}
?>
