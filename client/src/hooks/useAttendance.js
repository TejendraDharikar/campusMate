import { useQuery } from "@tanstack/react-query";
import { fetchAllAttendance, fetchAttendance } from "../services/attendanceService";

export const useAllAttendance = ()=>{
  return useQuery({
    queryKey:["allAttendance"],
    queryFn:()=>{
      console.log("📤 Fetching all attendance records");
      return fetchAllAttendance();
    },

    onError:(error)=>{
      console.error("Failed to fetch all attendance",error);
      
    },
  }
  );
}


export const useAttendance = (studentId) => {
  return useQuery({
    queryKey: ["attendance", studentId],
    queryFn: () => {
      console.log("📤 Fetching attendance for studentId:", studentId);

      return fetchAttendance(studentId)},
    enabled: !!studentId,
    onError: (error) => {
  console.error("Attendance fetch failed:", error);
}
  });
};

