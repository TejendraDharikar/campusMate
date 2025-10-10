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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Students Enrolled in Your Courses</h2>
      
      {studCourses.length === 0 ? (
        <p className="text-gray-600">No students enrolled in your courses yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Course</th>
              </tr>
            </thead>
            <tbody>
              {studCourses.map((c, index) => (
                <tr 
                  key={`${c.student_id}-${c.course_id}-${index}`} 
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm text-gray-800">{c.student_name || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{c.email || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{c.course_name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-gray-600">Total: {studCourses.length} enrollment(s)</p>
        </div>
      )}
    </div>
  )
}

export default ManageCourses