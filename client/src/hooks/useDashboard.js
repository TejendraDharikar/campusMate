import { useQuery } from "@tanstack/react-query";
import {
  getStudentDashboardStats,
  getTeacherDashboardStats,
} from "../services/dashboardService";

export const useTeacherDashboard = (teacher_id) => {
  console.log("hook data", teacher_id);
  return useQuery({
    queryKey: ["dashboardStats", teacher_id],
    queryFn: () => getTeacherDashboardStats(teacher_id),
    enabled: !!teacher_id,

    onError: (err) => {
      console.error("failed to fetch grade by ID in hooks", err);
      console.log("error in hook:", teacher_id);
    },
  });
};

export const useStudentDashboard = (student_id) => {
  return useQuery({
    queryKey: ["studentdashboardstats", student_id],
    queryFn: () => getStudentDashboardStats(student_id),
    enabled: !!student_id,

    onError: (err) => {
      console.error("failed to fetch grade by ID in hooks", err);
      console.log("error in hook:", teacher_id);
    },
  });
};
