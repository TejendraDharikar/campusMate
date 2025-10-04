import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import StudentAttendance from "./pages/StudentAttendance";

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
path:"/student-attendance",
element:(
 <DashboardLayout>
        <StudentAttendance />
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