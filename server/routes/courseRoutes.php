<?php
require_once __DIR__ . "/../controllers/CourseController.php";

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/courses' && $method === 'GET') {
  CourseController::index();
} elseif ($uri === '/api/courses' && $method === 'POST') {
  CourseController::store();
}


?>