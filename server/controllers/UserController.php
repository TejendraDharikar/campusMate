<?php
require_once __DIR__ . '/../models/UserModel.php';

class UserController
{
    public static function register()
    {
        $input = json_decode(file_get_contents("php://input"), true);
        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $role = $input['role'] ?? '';
        $department = $input['department'] ?? '';
        $phone = $input['phone'] ?? null;
        $age = $input['age'] ?? null;

        if (!$name || !$email || !$password || !$role || !$department) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            exit;
        }

        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $user_id = UserModel::createUser($name, $email, $password_hash, $role, $department);
        if (!$user_id) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to create user"]);
            exit;
        }

        if ($role === 'student') {
            $studentId = UserModel::createStudentProfile($user_id, $name, $email, $department, $age);
            if (!$studentId) {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create student profile"]);
                exit;
            }
            UserModel::updateLinkedStudentId($user_id, $studentId);
        } elseif ($role === 'teacher') {
            $teacherId = UserModel::createTeacherProfile($user_id, $name, $department, $phone);
            if (!$teacherId) {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create teacher profile"]);
                exit;
            }
            UserModel::updateLinkedTeacherId($user_id, $teacherId);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid role"]);
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