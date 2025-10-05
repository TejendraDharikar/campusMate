<?php
function requireAuth() {
  session_start();
  if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
  }
}
?>