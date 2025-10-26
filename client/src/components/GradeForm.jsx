import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGradeMutations } from "../hooks/useGradeMutations";
import { useAuthStore } from "../context/useAuthStore";

const GradeForm = ({ initialData }) => {
  const { user } = useAuthStore();
  const { addGrade } = useGradeMutations(user?.id);
  const { grade_id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      student_id: initialData?.student_id || "",
      course_id: initialData?.course_id || "",
      grade: initialData?.grade || "",
      remarks: initialData?.remarks || "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form submitted with:",data);
    try {
     addGrade(data);
      console.log("Grade mutation called");
      navigate("/teacher-grade");
    } catch (error) {
      console.error("Error submitting grade:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {initialData ? "Update Grade" : "Add Grade"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <input
          type="number"
          placeholder="Student ID"
          {...register("student_id", { required: true })}
        />
        {errors.student_id && <span className="text-red-500">Student ID is required</span>}

        <input
          type="number"
          placeholder="Course ID"
          {...register("course_id", { required: true })}
        />
        {errors.course_id && <span className="text-red-500">Course ID is required</span>}

        <input
          type="text"
          placeholder="Grade"
          {...register("grade", { required: true })}
        />
        {errors.grade && <span className="text-red-500">Grade is required</span>}

        <input
          type="text"
          placeholder="Remarks"
          {...register("remarks", { required: true })}
        />
        {errors.remarks && <span className="text-red-500">Remarks are required</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : initialData ? "Update Grade" : "Add Grade"}
        </button>
      </form>
    </div>
  );
};

export default GradeForm;