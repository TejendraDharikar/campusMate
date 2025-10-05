<?php
require_once __DIR__ . '/../models/AuthModel.php';

class AuthController {
    public static function login() {
        header('Content-Type: application/json; charset=utf-8');

        $input = json_decode(file_get_contents("php://input"), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(["message" => "Email and password are required"]);
            exit;
        }

        $user = AuthModel::getUserByEmail($email);

        if (!$user) {
            http_response_code(404);
            echo json_encode(["message" => "User not found"]);
            exit;
        }

        if (password_verify($password, $user['password_hash'])) {
            echo json_encode([
                "id" => $user['id'],
                "name" => $user['name'],
                "role" => $user['role']
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Invalid password"]);
        }
    }
}
?>
