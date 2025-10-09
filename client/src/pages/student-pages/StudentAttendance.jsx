import { useAttendance } from "../../hooks/useAttendance";
import { useAuthStore } from "../../context/useAuthStore";

const StudentAttendance = () => {
  const { user } = useAuthStore();
  console.log("🔍 Auth user:", user);

  const { data, isLoading, isError } = useAttendance(user?.id);

    console.log("Attendance data:", data);


  if (isLoading) return <p className="text-blue-600">Loading attendance...</p>;
  if (isError) return <p className="text-red-600">Error loading attendance.</p>;
if (!Array.isArray(data)) return <p className="text-red-600">Invalid attendance response</p>;
if (data.length === 0) return <p>No attendance records found</p>;


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Attendance Records</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Course</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-t hover:bg-blue-50">
              <td className="p-3">{record.date}</td>
              <td className="p-3">{record.course}</td>
              <td className={`p-3 font-semibold ${
                record.status === "Present" ? "text-green-600" :
                record.status === "Absent" ? "text-red-600" :
                "text-yellow-600"
              }`}>
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;