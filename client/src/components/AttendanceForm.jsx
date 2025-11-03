import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAttendanceMutations } from "../hooks/useAttendanceMutations";
import { useAttendanceById } from "../hooks/useAttendance";

const AttendanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { addAttendance, updateAttendance } = useAttendanceMutations();
  const { data: existing, isPending } = useAttendanceById(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("Editing attendance ID:", id);
  console.log(" Existing attendance data:", existing);

  useEffect(() => {
    if (isEdit && existing) {
      reset({
        studentId: existing.student_id,
        courseId: existing.course_id,
        date: existing.date,
        status: existing.status,
      });
    }
  }, [existing, isEdit, reset]);

  const onSubmit = (data) => {
    console.log("submit data:", data);

    if (isEdit) {
      updateAttendance({ id, ...data });
    } else {
      addAttendance(data);
      console.log("data is", data);
    }
    navigate("/teacher-attendance");
  };

  if (isEdit && isPending) return <p>Loading attendance...</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4">
        {isEdit ? "Update Attendance" : "Add Attendance"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="number"
          placeholder="Student ID"
          {...register("studentId", { required: true })}
          className={
            isEdit
              ? "w-full pointer-events-none border p-2 rounded"
              : "w-full border p-2 rounded"
          }
        />
        {errors.studentId && (
          <p className="text-red-500">Student ID is required</p>
        )}

        <input
          type="number"
          placeholder="Course ID"
          {...register("courseId", { required: true })}
          className={
            isEdit
              ? "w-full pointer-events-none border p-2 rounded"
              : "w-full border p-2 rounded"
          }
        />
        {errors.courseId && (
          <p className="text-red-500">Course ID is required</p>
        )}

        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.date && <p className="text-red-500">Date is required</p>}

        <select
          type="enum"
          {...register("status", { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="present">present</option>
          <option value="absent">absent</option>
          <option value="late">late</option>
        </select>
        {errors.status && <p className="text-red-500">Status is required</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Add"} Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
