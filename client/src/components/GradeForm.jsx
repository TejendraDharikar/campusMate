import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGradeMutations } from "../hooks/useGradeMutations";
import { useEffect } from "react";
import { useGradeById } from "../hooks/useGrades";

const GradeForm = () => {
  const { grade_id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(grade_id);
  const { addGrade, updateGrade } = useGradeMutations();
  const { data: existing, isPending } = useGradeById(grade_id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("grade id is:", grade_id);
  console.log("existing grade data:", existing);

  useEffect(() => {
    if (isEdit && existing) {
      reset({
        student_id: existing.student_id,
        course_id: existing.course_id,
        grade: existing.score,
        remarks: existing.remarks,
      });
    }
  }, [existing, isEdit, reset]);

  const onSubmit = async (data) => {
    console.log("Form submitted with:", data);

    if (isEdit) {
      updateGrade({ grade_id, ...data });
    } else {
      addGrade(data);
    }

    navigate("/teacher-grade");
  };

  if (isEdit && isPending) return <p>loading grades...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? "Update Grade" : "Add Grade"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <input
          type="number"
          placeholder="Student ID"
          {...register("student_id", { required: true })}
          className={
            isEdit
              ? "w-full pointer-events-none border p-2 rounded"
              : "w-full border p-2 rounded"
          }
        />
        {errors.student_id && (
          <span className="text-red-500">Student ID is required</span>
        )}

        <input
          type="number"
          placeholder="Course ID"
          {...register("course_id", { required: true })}
          className={
            isEdit
              ? "w-full pointer-events-none border p-2 rounded"
              : "w-full border p-2 rounded"
          }
        />
        {errors.course_id && (
          <span className="text-red-500">Course ID is required</span>
        )}

        <input
          type="text"
          placeholder="Grade"
          {...register("grade", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.grade && (
          <span className="text-red-500">Grade is required</span>
        )}

        <input
          type="text"
          placeholder="Remarks"
          {...register("remarks", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.remarks && (
          <span className="text-red-500">Remarks are required</span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update Grade" : "Add Grade"}
        </button>
      </form>
    </div>
  );
};

export default GradeForm;
