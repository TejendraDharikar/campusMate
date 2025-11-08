<?php
require_once __DIR__ . '/../models/NoticeModel.php';

class NoticeController
{
  // Get all notices
  public static function getAllNotices()
  {
    $records = NoticeModel::fetchAll();
    echo json_encode($records);
  }

  // Get notice by ID
  public static function getNoticeById()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['noticeId'] ?? null;

    if (!$id) {
      echo json_encode(["error" => "Missing noticeId"]);
      exit;
    }

    $record = NoticeModel::getById($id);
    echo json_encode($record);
  }

 

  // Add a new notice
  public static function addNotice()
  {
    $data = json_decode(file_get_contents("php://input"), true);
  
    $title = $data['title'] ?? null;
    $body = $data['body'] ?? null;
    $expires_at = $data['expires_at'] ?? null;

    if (!$title || !$body ) {
      echo json_encode(["error" => "Missing required fields"]);
      exit;
    }

    $result = NoticeModel::add($title, $body, $expires_at);
    echo json_encode($result);
  }

  // Update a notice
  public static function updateNotice()
  {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    $title = $data['title'] ?? null;
    $body = $data['body'] ?? null;
    $expires_at = $data['expires_at'] ?? null;

    if (!$id || !$title || !$body) {
      echo json_encode(["error" => "Missing required fields"]);
      exit;
    }

    error_log("Received PATCH Notice: " . json_encode($data));
    $result = NoticeModel::updateById($id, $title, $body, $expires_at);
    echo json_encode($result);
  }

  // Delete a notice
  public static function deleteNotice()
  {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    if (!$id) {
      echo json_encode(["error" => "Missing id"]);
      exit;
    }

    $result = NoticeModel::deleteById($id);
    echo json_encode($result);
  }
}
?>