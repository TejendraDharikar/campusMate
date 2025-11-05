<?php
require_once __DIR__ . "/../controllers/GradeController.php";

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/grade/all' && $method === 'POST') {
  GradeController::teacherGrades();
} elseif ($uri === '/api/grade/student' && $method === 'POST') {
  GradeController::studentGrades();
} elseif ($uri === '/api/grade/byid' && $method === 'POST') {
  GradeController::getById();
}elseif ($uri === '/api/grade/bycourse' && $method === 'POST') {
  GradeController::gradeByCourse();
} elseif ($uri === '/api/grade/add' && $method === 'POST') {
  GradeController::addGrade();
} elseif ($uri === '/api/grade/update' && $method === 'PATCH') {
  GradeController::update();
} elseif ($uri === '/api/grade/delete' && $method === 'DELETE') {
  GradeController::delete();
}
?>