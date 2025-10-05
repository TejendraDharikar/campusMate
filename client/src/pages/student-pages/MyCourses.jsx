import { useEffect, useState } from "react";
import {  getCourses } from "../../services/courseService";


const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Courses</h2>
     {Array.isArray(courses) && courses.length > 0 ? (
  courses.map(course => (
    <div key={course.id}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  ))
) : (
  <p>No courses found or data is invalid.</p>
)}

    </div>
  );

}

export default MyCourses
