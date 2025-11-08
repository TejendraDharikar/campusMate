<?php
require_once __DIR__ . '/../controllers/NoticeController.php';

$uri = str_replace("/campusMate/server/index.php", "", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/notices/all' && $method === 'GET') {
  NoticeController::getAllNotices();
} elseif ($uri === '/api/notices/by-id' && $method === 'POST') {
  NoticeController::getNoticeById();
} elseif ($uri === '/api/notices/add' && $method === 'POST') {
  NoticeController::addNotice();
} elseif ($uri === '/api/notices/update' && $method === 'PATCH') {
  NoticeController::updateNotice();
} elseif ($uri === '/api/notices/delete' && $method === 'DELETE') {
  NoticeController::deleteNotice();
}

?>