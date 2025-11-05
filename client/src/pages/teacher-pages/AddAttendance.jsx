import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../context/useAuthStore";
import { useAttendanceMutations } from "../../hooks/useAttendanceMutations";
import { useStudentByCourse } from "../../hooks/useStudent";
import AddAttendanceNavbar from "../../components/AddAttendanceNavbar";

export const AddAttendancePage = () => {
  const { user } = useAuthStore();

  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  // Pass courseId to hook here:
  const { data: students = [], isLoading } = useStudentByCourse(courseId);

  const { addAttendance } = useAttendanceMutations(user?.id);
  const today = new Date().toISOString().split("T")[0];

  const [statuses, setStatuses] = useState({}); // { studentId: "Present" }

  const handleStatusChange = (studentId, status) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleAdd = (studentId) => {
    const status = statuses[studentId];
    if (!status) return alert("Please select a status");

    const payload = {
      date: today,
      studentId,
      courseId,
      status,
    };

    addAttendance(payload, {
      onSuccess: () => {
        alert("Attendance added");
        setStatuses((prev) => ({ ...prev, [studentId]: "" }));
      },
      onError: () => {
        alert("Failed to add attendance");
      },
    });
  };

  return (
    <div>
      <AddAttendanceNavbar />
      <h2 className="text-xl font-bold text-center mt-4 text-blue-700">
        Mark Attendance
      </h2>

      {isLoading ? (
        <p className="text-blue-500 text-center">Loading students...</p>
      ) : (
        <table className="w-full mt-4 bg-white shadow rounded">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Student</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id} className="border-t hover:bg-blue-50">
                <td className="p-3 text-center">{today}</td>
                <td className="p-3 text-center">{student.student_name}</td>
                <td className="p-3 text-center">
                  <select
                    className="border rounded px-2 py-1"
                    value={statuses[student.student_id] || ""}
                    onChange={(e) =>
                      handleStatusChange(student.student_id, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleAdd(student.student_id)}
                    className="border-2 border-green-500 px-3 py-1 rounded text-green-600 hover:bg-green-500 hover:text-white"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
