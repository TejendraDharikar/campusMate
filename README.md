# Root-level documentation

campusMate/
├── client/                  # React frontend (your current Vite setup)
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, icons
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Role-based pages (Student, Teacher, Admin)
│   │   ├── routes/          # Protected routes and navigation
│   │   ├── services/        # Axios calls to PHP backend
│   │   ├── context/         # Auth context (JWT/session)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── app.css
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── server/                  # PHP backend
│   ├── config/              # db.php (MySQL connection)
│   ├── controllers/         # Business logic (Auth, Student, Teacher, Admin)
│   ├── models/              # SQL queries or ORM logic
│   ├── routes/              # API endpoints (auth.php, student.php, etc.)
│   ├── middleware/          # Role-based access control
│   ├── index.php            # Entry point
│   └── .htaccess            # For routing (if using Apache)
│
├── database/                # SQL schema and seed files
│   ├── schema.sql
│   └── seed.sql
└── README.md                # Root-level documentation 

🔐 Phase 1: Authentication System
Backend
- [ ] Create users table with fields: id, name, email, password_hash, role
- [ ] Build auth.php route for login
- [ ] Use password_hash() and password_verify() for secure login
- [ ] Return JSON with success, role, name
Frontend
- [ ] Build Login.jsx page with form
- [ ] Create authService.js to call auth.php
- [ ] Store login state in AuthContext.jsx
- [ ] Redirect user based on role (student, teacher, admin)

🧑‍🎓 Phase 2: Student Dashboard
Backend
- [ ] Create students table and link to users
- [ ] Build student.php route to fetch enrolled courses, grades, attendance
- [ ] Use prepared statements to query data
Frontend
- [ ] Build StudentDashboard.jsx
- [ ] Create studentService.js to fetch student data
- [ ] Display courses, grades, attendance in Tailwind cards/tables

🧑‍🏫 Phase 3: Teacher Dashboard
Backend
- [ ] Create courses table with teacher_id
- [ ] Build teacher.php route to fetch assigned courses and submit grades
- [ ] Add grades table with student_id, course_id, grade
Frontend
- [ ] Build TeacherDashboard.jsx
- [ ] Create teacherService.js to fetch and submit data
- [ ] UI for grade submission and course view

🧑‍💼 Phase 4: Admin Dashboard
Backend
- [ ] Build admin.php route to manage users, courses, attendance
- [ ] Add CRUD operations for users, courses, attendance
Frontend
- [ ] Build AdminDashboard.jsx
- [ ] Create adminService.js for API calls
- [ ] UI for user management, course creation, attendance tracking

🧠 Phase 5: Role-Based Routing & Protection
- [ ] Create ProtectedRoute.jsx to restrict access by role
- [ ] Redirect unauthorized users to /login
- [ ] Add NotFound.jsx for invalid routes

🎨 Phase 6: UI/UX Polish
- [ ] Add Tailwind styling to all pages
- [ ] Create reusable components: Navbar, Sidebar, Card, Table
- [ ] Add loading spinners and error messages
- [ ] Make it responsive for mobile and desktop

📦 Phase 7: Final Touches
- [ ] Add .env for API base URL
- [ ] Write README.md with setup instructions
- [ ] Test all roles and flows
- [ ] Prepare screenshots or demo video for presentation
