import { useQuery } from "@tanstack/react-query";
import {
  attendanceByCourse,
  fetchAllAttendance,
  fetchAttendance,
  fetchAttendanceById,
} from "../services/attendanceService";
import {useSearchParams} from "react-router-dom";


export const useAllAttendance = () => {
  return useQuery({
    queryKey: ["allAttendance"],
    queryFn: () => {
      console.log(" Fetching all attendance records");
      return fetchAllAttendance();
    },

    onError: (error) => {
      console.error("Failed to fetch all attendance", error);
    },
  });
};

export const useAttendanceById = (attendanceId) => {
  return useQuery({
    queryKey: ["attendanceById", attendanceId],
    queryFn: () => fetchAttendanceById(attendanceId),
    enabled: !!attendanceId,
  });
};

export const useAttendance = (studentId) => {
  return useQuery({
    queryKey: ["attendance", studentId],
    queryFn: () => {
      console.log("Fetching attendance for studentId:", studentId);

      return fetchAttendance(studentId);
    },
    enabled: !!studentId,
    onError: (error) => {
      console.error("Attendance fetch failed:", error.message);
    },
  });
};


export const useAttendanceByCourse=()=>{
const [searchParams]= useSearchParams();
const courseId = searchParams.get("courseId");


  return useQuery({
    queryKey:["courseAttendance",courseId],
    queryFn:()=>attendanceByCourse(courseId),
    enabled:!!courseId,
    onError:(error)=>{
    console.error("Attendance fetch failed:", error.message);
    },
  });
};