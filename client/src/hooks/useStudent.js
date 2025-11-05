import { useQuery } from "@tanstack/react-query";
import { studentByCourse } from "../services/studentService";

export const useStudentByCourse = (courseId) => {
  return useQuery({
    queryKey: ["studentbycourse", courseId],
    queryFn: () => studentByCourse(courseId),
    enabled: !!courseId,
    onError: (err) => {
      console.error("failed to fetch student by course", err);
    },
  });
};