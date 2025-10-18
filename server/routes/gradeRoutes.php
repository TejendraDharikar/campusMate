<?php
require_once __DIR__ . "/../controllers/GradeController.php";

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/grade/all' && $method === 'POST') {
  GradeController::teacherGrades();
} elseif ($uri === '/api/grade/student' && $method === 'POST') {
  GradeController::studentGrades();
}


?>