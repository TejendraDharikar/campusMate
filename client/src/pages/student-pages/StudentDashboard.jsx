import { Link } from "react-router-dom";
import { useAuthStore } from "../../context/useAuthStore";
import { useStudentDashboard } from "../../hooks/useDashboard";

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const {data,isLoading,error}=useStudentDashboard(user?.id);

  console.log("data is :",data);

    if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard</p>;
  

  return (
   <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">My courses</h2>
          <p className="text-3xl font-bold">{data.courseCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">My Grades</h2>
          <p className="text-3xl font-bold">{data.gradeCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <p className="text-3xl font-bold">{data.attendanceCount}</p>
        </div>
      </div>

      {/* Navigation Links */}
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/student-courses" className="bg-yellow-600 text-white p-4 rounded hover:bg-yellow-700 text-center">
          my Courses
        </Link>

       
        <Link to="/student-grade" className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 text-center">
          My Grades
        </Link>

         <Link to="/student-attendancee" className="bg-green-600 text-white p-4 rounded hover:bg-green-700 text-center">
          My Attendance
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;