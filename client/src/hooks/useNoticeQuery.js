import { useQuery } from "@tanstack/react-query";
import {
  fetchAllNotices,
  fetchNoticeById,
} from "../services/noticeService";

// Fetch all notices
export const useAllNotices = () => {
  return useQuery({
    queryKey: ["allNotices"],
    queryFn: () => {
      console.log("Fetching all notices");
      return fetchAllNotices();
    },
   
    onError: (error) => {
      console.error("Failed to fetch all notices", error);
    },
  });
};

// Fetch notice by ID
export const useNoticeById = (noticeId) => {
  return useQuery({
    queryKey: ["noticeById", noticeId],
    queryFn: () => fetchNoticeById(noticeId),
    enabled: !!noticeId,
  });
};

