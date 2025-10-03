<?php 
header("Access-Control-Allow-Origin:*"); 
header("Access-Control-Allow-Headers: Content-Type,Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}
?>