<?php
require_once __DIR__ . '/../controllers/AuthController.php';

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/login' && $method === 'POST') {
  AuthController::login();
}

?>