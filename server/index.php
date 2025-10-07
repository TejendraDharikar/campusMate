<?php
require_once __DIR__ . "/config/db.php";
require_once __DIR__ . "/middleware/CorsMiddleware.php";

// route files
require_once __DIR__ . "/routes/courseRoutes.php";
require_once __DIR__ . "/routes/attendanceRoutes.php";
require_once __DIR__ . "/routes/userRoutes.php";
require_once __DIR__ . "/routes/authRoutes.php";

?>
