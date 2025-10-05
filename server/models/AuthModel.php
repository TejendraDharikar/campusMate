<?php
 class AuthModel{
 public static function getUserByEmail(string $email): ?array {
        global $conn;
        $stmt = $conn->prepare("SELECT id, name, role, password_hash FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        return $user ?: null;
    }
 }
?>