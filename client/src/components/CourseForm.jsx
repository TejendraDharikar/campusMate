
import { useCourseMutation } from '../hooks/useCourseMutation'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CourseForm = ({initialData}) => {

  const {}=useParams();//for editing course in future
  const{addCourse,updateCourse}=useCourseMutation();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  }=useForm({
    defaultValues:{
      student_id:initialData?.student_id || "",
      course_id:initialData?.course_id || "",
    },
  });

  const onSubmit=async(data)=>{
    console.log("Form submitted with:",data);
    try{
      if(initialData){
        // updateCourse(data); for future use
        console.log("update Course mutation called",data);
      }else
      {addCourse(data);
      console.log("add Course mutation called",data);}
      navigate("/manage-courses");
    }
    catch(error){
      console.error("Error submitting course:",error);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{initialData?"Update Course Enrollment":" Add Course Enrollment"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col">
        <div>
          <label>StudentId</label>
        <input type="number"
         placeholder="student id"
         {...register("student_id",{required:true})}
          />
          {errors.student_id && <span className="text-red-500">Student ID is required</span>}
        </div>

        <div>
          <label>CourseId</label>
        <input type="number"
         placeholder="course id"
         {...register("course_id",{required:true})}
          />
          {errors.course_id && <span className="text-red-500">Course ID is required</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : initialData ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  )
}

export default CourseForm
