
import { useNavigate } from 'react-router-dom'

const GradeNavbar = () => {
const navigate= useNavigate();

const courses=[
  {name:"computer science",id:"1"},
  {name:"artificial intelligence",id:"2"},
  {name:"Math",id:"3"},
  {name:"Digital Marketing",id:"4"},
  {name:"Python",id:"5"},
];

  return (
   <nav className='flex gap-4 justify-center mt-4 mb-6'>
    {courses.map(course=>(
      <button
      key={course.id}
      onClick={()=>navigate(`/teacher-grade?courseId=${course.id}`)}
      className='px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white'
      >
        {course.name}
      </button>
    ))}
   </nav>
  );
};

export default GradeNavbar
