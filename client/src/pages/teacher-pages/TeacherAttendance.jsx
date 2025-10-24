import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/useAuthStore';
import { useAllAttendance} from '../../hooks/useAttendance';
import { useAttendanceMutations } from '../../hooks/useAttendanceMutations';


const TeacherAttendance = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { deleteAttendance } = useAttendanceMutations();
  const { data:attendanceRecords,refetch, isLoading, isError } = useAllAttendance();

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this record?")) {
    deleteAttendance(id,
      { onSuccess: () => {
        refetch();
      } }
    );
  }
};


console.log("Logged in user:", user);

    console.log("Attendance data:",attendanceRecords);


  if (isLoading) return <p className="text-blue-600">Loading All attendance...</p>;
  if (isError) return <p className="text-red-600">Error loading All attendance.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 text-center mt-2">Attendance Records</h2>
      <div className='text-right'> <button 
      className="border-2 border-green-500 px-4 py-2 rounded 
      text-green-500 font-semibold hover:bg-green-500 hover:text-white mr-5 mb-2"
      onClick={() => navigate('/attendanceForm')}
      >Add Attendance</button></div>
     

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className='p-3'>Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Action</th>
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
              <td className='flex p-3 justify-evenly mr-2 mt-2 font-semibold '>
                <button onClick={() => navigate(`/attendanceForm/${record.id}`)}
                  className='border-2 rounded border-blue-500 px-2 py-1 
                   text-blue-500 hover:bg-blue-500 hover:text-white'
                  >Update</button>
              <button onClick={()=>handleDelete(record.id)}
                className='border-2 rounded border-red-500 px-2 py-1 
                   text-red-500 hover:bg-red-500 hover:text-white'
                   >delete</button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TeacherAttendance
