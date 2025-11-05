import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAttendanceMutations } from "../hooks/useAttendanceMutations";

const AttendanceForm = () => {
  const navigate = useNavigate();
  const { addAttendance } = useAttendanceMutations();
  const today = new Date().toLocaleDateString("en-CA");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addAttendance(data, {
      onSuccess: () => {
        navigate("/teacher-attendance");
      },
      onError: () => {
        alert("Failed to add attendance");
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4">Add Attendance</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="number"
          placeholder="Student ID"
          {...register("studentId", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.studentId && <p className="text-red-500">Student ID is required</p>}

        <input
          type="number"
          placeholder="Course ID"
          {...register("courseId", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.courseId && <p className="text-red-500">Course ID is required</p>}

        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full border p-2 rounded"
          min={today}
          max={today}
          defaultValue={today}
        />
        {errors.date && <p className="text-red-500">Date is required</p>}

        <select
          {...register("status", { required: true })}
          className="w-full border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="present">present</option>
          <option value="absent">absent</option>
          <option value="late">late</option>
        </select>
        {errors.status && <p className="text-red-500">Status is required</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
