import {useAuthStore} from "../../context/useAuthStore"
import { useStudentCourses } from "../../hooks/useStudentCourses";


const MyCourses = () => {
  const {user} = useAuthStore();
  const {data,isPending,isError}=useStudentCourses(user?.id);

   console.log("👤 Auth user:", user); // Check user.id
  console.log("📤 Fetching courses for studentId:", user?.id);
  console.log("📘 Course data:", data); // Final result


  if (isPending) return <p>Loading your courses...</p>;
  if (isError) return <p>error loading your courses</p>;

 return (
   <div className="w-full px-4 py-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
     My Courses
  </h2>

  {data.length === 0 ? (
    <div className="text-gray-600 text-center py-10">
      <p className="text-lg">You haven’t enrolled in any courses yet.</p>
      <p className="text-sm mt-2">Explore available courses and start learning!</p>
    </div>
  ) : (
    <div className="space-y-6 w-full">
      {data.map((course, idx) => (
        <div
          key={idx}
          className="w-full bg-white border border-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2">
            {course.course_name}
          </h3>
          <p className="text-gray-700 mb-2">{course.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Credits: <strong>{course.credits}</strong></span>
            <span> Teacher: <strong>{course.teacher_name}</strong></span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  )
}

export default MyCourses
