<?php

class NoticeModel
{
  public static function fetchAll()
  {
    global $conn;
    $query = "
      SELECT id, title, body, created_at, expires_at
      FROM notices 
      ORDER BY created_at DESC
    ";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $records = [];
    while ($row = $result->fetch_assoc()) {
      $records[] = [
        "id" => $row['id'],
        "title" => $row['title'],
        "body" => $row['body'],
        "created_at" => $row['created_at'],
        "expires_at" => $row['expires_at'],
      ];
    }

    $stmt->close();
    return $records;
  }

  public static function getById($id)
  {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notices WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    return $result ?: ["error" => "Notice not found"];
  }

  public static function add($title, $body, $expires_at)
  {
    global $conn;
    $query = "INSERT INTO notices (title, body, expires_at) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    if (empty($expires_at)) {
    $expires_at = null;
}
    $stmt->bind_param("sss", $title, $body, $expires_at);

    if ($stmt->execute()) {
      $id = $stmt->insert_id;
      $stmt->close();
      return ["success" => true, "id" => $id];
    } else {
      error_log("SQL Error: " . $stmt->error);
      $stmt->close();
      return ["error" => "Insert failed"];
    }
  }

public static function updateById($id, $title, $body, $expires_at)
{
    global $conn;
    $stmt = $conn->prepare("UPDATE notices SET title = ?, body = ?, expires_at = ? WHERE id = ?");
    
    if (empty($expires_at)) {
        $expires_at = null;
    }

    $stmt->bind_param("sssi", $title, $body, $expires_at, $id);

    $success = $stmt->execute();
    $stmt->close();
    return $success ? ["success" => true] : ["error" => "Update failed"];
}



  public static function deleteById($id)
  {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM notices WHERE id = ?");
    $stmt->bind_param("i", $id);
    $success = $stmt->execute();
    $stmt->close();
    return $success ? ["success" => true] : ["error" => "Delete failed"];
  }
}
?>