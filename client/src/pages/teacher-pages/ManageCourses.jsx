import { useAuthStore } from "../../context/useAuthStore";
import { useAllStudentCourses } from "../../hooks/useStudentCourses"

const ManageCourses = () => {
  const {user} = useAuthStore();
  const {data: studCourses, isPending, isError, error} = useAllStudentCourses(user?.id);

  console.log("auth data:", user);
  console.log("all student courses data:", studCourses);
  console.log("Is array?", Array.isArray(studCourses));

  if (isPending) return <p>Loading all student courses...</p>;
  
  if (isError) {
    console.error("Query Error:", error);
    return <p>Error loading your courses. Please check console.</p>;
  }

  // Safety check for invalid data
  if (!studCourses) {
    return <p>No data received from server</p>;
  }

  if (!Array.isArray(studCourses)) {
    console.error("Data is not an array:", studCourses);
    return <p>Invalid data format received</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Students Enrolled in Your Courses</h2>
      
      {studCourses.length === 0 ? (
        <p className="text-gray-600">No students enrolled in your courses yet</p>
      ) : (
        <div className="overflow-x-auto ">

           
<div className='flex justify-between'>
  <p className="ml-4 mt-3">Total: {studCourses.length} enrollment(s)</p>
   <button 
      className="border-2 border-green-500 px-4 py-2 rounded 
      text-green-500 font-semibold hover:bg-green-500 hover:text-white mr-5 mb-2"
      >Add Grade</button></div>
          <table className="min-w-full shadow rounded bg-white">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Course</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {studCourses.map((c, index) => (
                <tr 
                  key={`${c.student_id}-${c.course_id}-${index}`} 
                  className="border-t hover:bg-blue-50"
                >
                  <td className="p-3">{c.student_name || 'N/A'}</td>
                  <td className="p-3">{c.email || 'N/A'}</td>
                  <td className="p-3">{c.course_name || 'N/A'}</td>
                  <td className='flex p-2 justify-evenly mr-2 mt-2 mb-2 font-semibold '>
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
      )}
    </div>
  )
}

export default ManageCourses