<?php
require_once __DIR__ . '/../controllers/AttendanceController.php';

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/attendance/all' && $method === 'GET') {
  AttendanceController::getAllStudentsAttendance();
}
elseif ($uri === '/api/attendance/student' && $method === 'POST') {
  AttendanceController::getStudentAttendance();
}elseif($uri === '/api/attendance/add' && $method === 'POST'){
  AttendanceController::addStudentAttendance();
}elseif($uri === '/api/attendance/update' && $method === 'PUT'){
  AttendanceController::updateStudentAttendance();
}elseif($uri === '/api/attendance/delete' && $method === 'DELETE'){
  AttendanceController::deleteStudentAttendance();
}


?>