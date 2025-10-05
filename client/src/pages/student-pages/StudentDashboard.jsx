import { useAuthStore } from "../../context/useAuthStore";

const StudentDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">
        Welcome, {user?.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">My Courses</h2>
          <p>View your enrolled subjects and materials.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <p>Track your attendance and class participation.</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p>Check deadlines and submit your work.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;