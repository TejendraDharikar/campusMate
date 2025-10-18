import { useAuthStore } from "../context/useAuthStore";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const links = {
    student: [
      { label: "Dashboard", path: "/student-dashboard" },
      { label: "My Courses", path: "/student-courses" },
      {label:"My Grades", path: "/student-grade"},
      { label: "Attendance", path: "/student-attendance" },
    ],
    teacher: [
      { label: "Dashboard", path: "/teacher-dashboard" },
      // { label: "Manage Classes", path: "/teacher-classes" },
      {label: " Student Courses", path:"/manage-courses"},
       {label:"Manage Grades", path: "/teacher-grade"},
      // { label: "Assignments", path: "/teacher-assignments" },
      { label: "Manage Attendance", path: "/teacher-attendance" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin-dashboard" },
      { label: "Manage Users", path: "/admin-users" },
      { label: "System Settings", path: "/admin-settings" },
    ],
  };

  const roleLinks = user?.role ? links[user.role] : [];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold p-4 border-b border-white">
          CampusMate
        </h2>
        <nav className="p-4 space-y-2">
          {roleLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="block w-full text-left px-4 py-2 rounded hover:bg-blue-700"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-white">
        <p className="mb-2">Logged in as: {user?.name}</p>
        <button
          onClick={() => {
            logout();
            localStorage.clear();
            navigate("/login");
          }}
          className="w-full py-2 border-1 border-red-400 rounded-4xl hover:bg-red-700 hover:border-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;