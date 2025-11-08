import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addNotice,
  updateNotice,
  deleteNotice,
} from "../services/noticeService";
import { data } from "react-router-dom";

export const useNoticeMutations = () => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: (data) =>
      addNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotices"] });
      alert("Notice added successfully");
    },
    onError: (error) => {
      console.error("Error adding notice:", error);
      alert("Failed to add notice. Please try again.");
    },
  });

  const update = useMutation({
    mutationFn: (data) =>
      updateNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotices"] });
      
      
      alert("Notice updated successfully");
    },
    onError: () => {
      alert("Failed to update notice");
    },
  });

  const remove = useMutation({
    mutationFn: (id) => deleteNotice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotices"] });
    },
  });

  return {
    addNotice: add.mutate,
    updateNotice: update.mutate,
    deleteNotice: remove.mutate,
  };
};