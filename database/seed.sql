--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `linked_student_id`, `created_at`) VALUES
(1, 'ram', 'ram@gmail', '1234', 'student', NULL, '2025-10-02 20:05:12'),
(2, 'raj', 'raj@mail.com', '123456', 'teacher', NULL, '2025-10-02 22:21:32');




UPDATE `teacher_profiles` SET `phone` = '9099998999' WHERE `teacher_profiles`.`id` = 1;