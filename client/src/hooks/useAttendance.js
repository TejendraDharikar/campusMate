import { useQuery } from "@tanstack/react-query";
import { fetchAttendance } from "../services/attendanceService";


export const useAttendance = (studentId) => {
  return useQuery({
    queryKey: ["attendance", studentId],
    queryFn: () => fetchAttendance(studentId),
    enabled: !!studentId,
    onError: (error) => {
  console.error("Attendance fetch failed:", error);
}
  });
};