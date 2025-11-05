import { useNavigate, useSearchParams } from "react-router-dom";
import { useGradeByCourse } from "../../hooks/useGrades";
import GradeNavbar from "../../components/GradeNavbar";
import { useGradeMutations } from "../../hooks/useGradeMutations";

const ManageGrades = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  // React Query hook to fetch grades filtered by courseId
  const {
    data: grades = [],
    isLoading,
    isError,
  } = useGradeByCourse(courseId);

  // React Query mutations for CRUD operations
  const { deleteGrade: deleteGradeMutation } = useGradeMutations();

  if (isLoading) return <p>Loading grades for selected course...</p>;
  if (isError) return <p>Error loading grades.</p>;

  // Delete handler with mutation and confirmation
  const handleDelete = (grade_id) => {
    if (window.confirm("Confirm delete grade record?")) {
      deleteGradeMutation(grade_id);
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-green-50 to-white rounded-lg shadow-md p-6">
      <GradeNavbar />
      <h2 className="text-2xl font-bold text-green-800 text-center pt-4">
        {courseId
          ? `Grades for Course ID: ${courseId}`
          : "Please select a course from above"}
      </h2>

      <div className="text-right mb-4">
        <button
          onClick={() => navigate("/gradeForm")}
          className="border-2 border-green-500 px-4 py-2 rounded text-green-500 font-semibold hover:bg-green-500 hover:text-white"
        >
          Add Grade
        </button>
      </div>

      {grades.length === 0 ? (
        <p className="text-center mt-6">No student grades found for this course.</p>
      ) : (
        <table className="w-full bg-white shadow rounded mt-4">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">Course Name</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Remarks</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {grades.map((grade) => (
              <tr key={grade.grade_id} className="border-t hover:bg-green-50">
                <td className="p-3">{grade.student_name}</td>
                <td className="p-3">{grade.course_name}</td>
                <td className="p-3">{grade.score}</td>
                <td className="p-3">{grade.remarks}</td>
                <td className="flex p-3 justify-evenly font-semibold">
                  <button
                    onClick={() => navigate(`/gradeForm/${grade.grade_id}`)}
                    className="border-2 rounded border-blue-500 px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(grade.grade_id)}
                    className="border-2 rounded border-red-500 px-2 py-1 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
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

export default ManageGrades;
