import { useAuthStore } from '../../context/useAuthStore';
import { useStudentGrades } from '../../hooks/useGrades';

const MyGrades = () => {
  const { user } = useAuthStore();
  const { data: grades, isPending, isError } = useStudentGrades(user?.id);

  console.log("👤 Auth user:", user);
  console.log("📤 Fetching grades for studentId:", user?.id);
  console.log("📚 Grade data:", grades);

  if (isPending) return <p>Loading your grades...</p>;
  if (isError) return <p>Error loading your grades</p>;

  return (
    <div className="w-full px-4 py-6 bg-gradient-to-br from-green-50 to-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
        My Grades
      </h2>

      {grades.length === 0 ? (
        <div className="text-gray-600 text-center py-10">
          <p className="text-lg">No grades available yet.</p>
          <p className="text-sm mt-2">Check back after your assessments are graded.</p>
        </div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Remarks</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, i) => (
              <tr key={i} className="border-b hover:bg-green-50">
                <td className="px-4 py-2">{g.course_name}</td>
                <td className="px-4 py-2">{g.score}</td>
                <td className="px-4 py-2">{g.remarks}</td>
                <td className="px-4 py-2">{g.graded_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyGrades;