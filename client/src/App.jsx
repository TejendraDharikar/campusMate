import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/other-pages/Login";
import StudentDashboard from "./pages/student-pages/StudentDashboard";
import TeacherDashboard from "./pages/teacher-pages/TeacherDashboard";
// import AdminDashboard from "./pages/other-pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/other-pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import StudentAttendance from "./pages/student-pages/StudentAttendance";
import MyCourses from "./pages/student-pages/MyCourses";

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