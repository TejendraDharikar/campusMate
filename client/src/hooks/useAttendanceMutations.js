import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAttendance, deleteAttendance, updateAttendance } from "../services/attendanceService";

export const useAttendanceMutations = (studentId)=>{
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: ({ courseId, date, status }) =>
      addAttendance(studentId, courseId, date, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", studentId] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, status }) => updateAttendance(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", studentId] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", studentId] });
    },
  });

  return {
    addAttendance:add.mutate,
    updateAttendance: update.mutate,
    deleteAttendance: remove.mutate,
  };

};