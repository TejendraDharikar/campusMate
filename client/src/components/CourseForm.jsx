import { useCourseMutation } from "../hooks/useCourseMutation";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStudentById } from "../hooks/useStudentCourses";
import { useEffect } from "react";

const CourseForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { addCourse, updateCourse } = useCourseMutation();
  const navigate = useNavigate();
  const { data: existing, isPending } = useStudentById(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("id is :", id);
  console.log("existing data in form", existing);

  useEffect(() => {
    if (isEdit && existing) {
      reset({
        student_id: existing.student_id,
        course_id: existing.course_id,
      });
    }
  }, [existing, isEdit, reset]);

  const onSubmit = async (data) => {
    console.log("Form submitted with:", data);
    if (isEdit) {
      updateCourse({ id, ...data });
    } else {
      addCourse(data);
    }
    navigate("/manage-courses");
  };

  if (isEdit && isPending) return <p>loading course data... </p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? "Update Course Enrollment" : " Add Course Enrollment"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>StudentId</label>
          <input
            type="number"
            placeholder="student id"
            {...register("student_id", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.student_id && (
            <span className="text-red-500">Student ID is required</span>
          )}
        </div>

        <div>
          <label>CourseId</label>
          <input
            type="number"
            placeholder="course id"
            {...register("course_id", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.course_id && (
            <span className="text-red-500">Course ID is required</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
