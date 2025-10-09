import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/useAuthStore';
import { useAllAttendance} from '../../hooks/useAttendance';

const TeacherAttendance = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data:attendanceRecords, isLoading, isError } = useAllAttendance();

    console.log("Attendance data:",attendanceRecords);


  if (isLoading) return <p className="text-blue-600">Loading All attendance...</p>;
  if (isError) return <p className="text-red-600">Error loading All attendance.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Attendance Records</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className='p-3'>Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index} className="border-t hover:bg-blue-50">
              <td className="p-3">{record.date}</td>
              <td className="p-3">{record.student}</td>
              <td className="p-3">{record.course}</td>
              <td className={`p-3 font-semibold ${
                record.status === "Present" ? "text-green-600" :
                record.status === "Absent" ? "text-red-600" :
                "text-yellow-600"
              }`}>
                {record.status}
              </td>
              <td><button onClick={() => navigate(`/attendanceForm/${record.id}`)}>Update</button></td>
              <td><button onClick={()=>handleDelete(record.id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TeacherAttendance
