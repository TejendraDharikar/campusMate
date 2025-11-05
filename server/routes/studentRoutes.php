<?php
require_once __DIR__ . '/../controllers/StudentController.php';

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/student/bycourse' && $method === 'POST') {
  StudentController::getStudentsByCourse();
} 
?>