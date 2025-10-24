import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/other-pages/Login";
import StudentDashboard from "./pages/student-pages/StudentDashboard";
import TeacherDashboard from "./pages/teacher-pages/TeacherDashboard";
// import AdminDashboard from "./pages/other-pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/other-pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import MyCourses from "./pages/student-pages/MyCourses";
import StudentAttendance from "./pages/student-pages/StudentAttendance";
import TeacherAttendance from "./pages/teacher-pages/TeacherAttendance";
import ManageCourses from "./pages/teacher-pages/ManageCourses";
import ManageGrades from "./pages/teacher-pages/ManageGrades";
import MyGrades from "./pages/student-pages/MyGrades";
import AttendanceForm from "./components/AttendanceForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path: "/student-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <DashboardLayout>
          <StudentDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
path:"/student-grade",
element:(
 <DashboardLayout>
        <MyGrades/>
        </DashboardLayout>
),
  },
   {
path:"/student-attendance",
element:(
 <DashboardLayout>
        <StudentAttendance />
        </DashboardLayout>
),
  },
  {
  path:"/student-courses",
  element:(
    <DashboardLayout>
      <MyCourses/>
    </DashboardLayout>
  )
  },
  {
    path: "/teacher-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <DashboardLayout>
        <TeacherDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
   {
path:"/manage-courses",
element:(
 <DashboardLayout>
        <ManageCourses />
        </DashboardLayout>
),
  },
  {
path:"/teacher-grade",
element:(
 <DashboardLayout>
        < ManageGrades/>
        </DashboardLayout>
),
  },
  {
path:"/teacher-attendance",
element:(
 <DashboardLayout>
        <TeacherAttendance />
        </DashboardLayout>
),
  },
  {
path:"/attendanceForm",
element:(
 <DashboardLayout>
        <AttendanceForm />
        </DashboardLayout>
),
  },
 {
path:"/attendanceForm/:id",
element:(
 <DashboardLayout>
        <AttendanceForm />
        </DashboardLayout>
),
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute allowedRoles={["admin"]}>
  //       <AdminDashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  {
  path: "*",
  element: <Navigate to="/" replace />
}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;