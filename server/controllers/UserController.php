<?php
require_once __DIR__ . '/../models/UserModel.php';

class UserController {
    public static function register() {
        $input = json_decode(file_get_contents("php://input"), true);
        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $role = $input['role'] ?? '';
        $department = $input['department'] ?? '';
        $enrollment_number = $input['enrollment_number'] ?? null;
        $employee_id = $input['employee_id'] ?? null;

        if (!$name || !$email || !$password || !$role || !$department) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            exit;
        }

        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $user_id = UserModel::createUser($name, $email, $password_hash, $role);
        if (!$user_id) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to create user"]);
            exit;
        }

        if ($role === 'student') {
            $success = UserModel::createStudentProfile($user_id, $enrollment_number, $department);
        } elseif ($role === 'teacher') {
            $success = UserModel::createTeacherProfile($user_id, $employee_id, $department);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid role"]);
            exit;
        }

        if (!$success) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to create profile"]);
            exit;
        }

        echo json_encode([
            "id" => $user_id,
            "name" => $name,
            "role" => $role
        ]);
    }
}
?>
