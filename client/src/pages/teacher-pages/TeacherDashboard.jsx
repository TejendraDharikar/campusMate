import { Link } from 'react-router-dom';
import { useTeacherDashboard } from '../../hooks/useDashboard';
import { useAuthStore } from '../../context/useAuthStore';

const Dashboard = () => {
  const {user}=useAuthStore();
const{data,isPending,error}=useTeacherDashboard(user?.id);

console.log("data is :",data)

if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-3xl font-bold">{data.studentCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Courses Offered</h2>
          <p className="text-3xl font-bold">{data.courseCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <p className="text-3xl font-bold">{data.attendanceCount}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/teacher-grade" className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 text-center">
          Manage Grades
        </Link>
       
        <Link to="/manage-courses" className="bg-yellow-600 text-white p-4 rounded hover:bg-yellow-700 text-center">
          Manage Courses
        </Link>

         <Link to="/teacher-attendance" className="bg-green-600 text-white p-4 rounded hover:bg-green-700 text-center">
          Manage Attendance
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
