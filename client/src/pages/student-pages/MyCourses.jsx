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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📘 My Courses</h2>
      {data.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((course, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{course.course_name}</h3>
              <p>{course.description}</p>
              <p>Credits: {course.credits}</p>
              <p>Teacher: {course.teacher_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}

export default MyCourses
