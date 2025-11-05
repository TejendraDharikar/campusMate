import { useNavigate } from 'react-router-dom';
import { useAllAttendance, useAttendanceByCourse} from '../../hooks/useAttendance';
import { useAttendanceMutations } from '../../hooks/useAttendanceMutations';
import AttendanceNavbar from '../../components/AttendanceNavbar';


const TeacherAttendance = () => {
  const navigate = useNavigate();
  const { deleteAttendance, updateAttendance } = useAttendanceMutations(); // add updateAttendance usage here
  const { data: attendanceRecords, refetch, isLoading, isError } = useAttendanceByCourse();

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      deleteAttendance(id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  const handleStatusChange = (recordId, newStatus, date) => {
    updateAttendance(
      { id: recordId, date: date, status: newStatus },
      {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          alert("Failed to update attendance status.");
        },
      }
    );
  };

  if (isLoading) return <p className="text-blue-600">Loading All attendance...</p>;
  if (isError) return <p className="text-red-600">Error loading All attendance.</p>;

  return (
    <div>
      <div className='flex justify-around'>
        <AttendanceNavbar /> 
        <button onClick={()=>navigate(`/add-attendance`)}
         className='border border-blue-500 px-7 my-5 rounded text-blue-500 hover:bg-blue-500 hover:text-white'
         >Add</button>
      </div>
      <h2 className="text-2xl font-bold text-blue-800 text-center mt-2">Attendance Records</h2>
      {/* Remove Add button if you want */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(attendanceRecords) && attendanceRecords.length>0 ? attendanceRecords.map((record, index) => (
            <tr key={index} className="border-t hover:bg-blue-50">
              <td className="p-3">{record.date}</td>
              <td className="p-3">{record.student}</td>
              <td className="p-3">{record.course}</td>
              <td className="p-3">
                <select
                  className={`border rounded px-2 py-1 font-semibold ${
                    record.status === "Present"
                      ? "text-green-600"
                      : record.status === "Absent"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                  value={record.status}
                  onChange={(e) => handleStatusChange(record.id, e.target.value, record.date)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
              <td className="flex p-3 justify-center mr-2 mt-2 font-semibold">
                <button
                  onClick={() => handleDelete(record.id)}
                  className="border-2 rounded border-red-500 px-2 py-1 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          )):(
    <tr>
      <td colSpan="5" className="text-center p-4 text-gray-500">
        Select the course to see attendance
      </td>
    </tr>
  )}
        </tbody>
      </table>
    </div>
  );
};



export default TeacherAttendance
