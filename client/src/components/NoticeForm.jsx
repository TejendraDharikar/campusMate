import { useForm } from "react-hook-form";
import { noticeSchema } from "../utils/zodSchema";
import { useNoticeMutations } from "../hooks/useNoticeMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNoticeById } from "../hooks/useNoticeQuery";

const NoticeForm = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(noticeId);
    const {data:existing,isPending}=useNoticeById(noticeId);
  const { addNotice, updateNotice } = useNoticeMutations();

  
  const {
     register,
      handleSubmit,
       reset,
       formState: { errors }
       } = useForm({
    resolver: zodResolver(noticeSchema),
  });
  const today = new Date().toISOString().split("T")[0];

   useEffect(() => {
      if (isEdit && existing) {
        reset({
          title: existing.title,
          body: existing.body,
          expires_at: existing.expires_at,
        });
      }
    }, [existing, isEdit, reset]);
  

      if (isEdit && isPending) return <p>loading grades...</p>


     

  const onSubmit = async (data) => {
    console.log("Form submitted with:", data);

    if (isEdit) {
      updateNotice({
        id: noticeId,
    data
  });
    } else {
      addNotice(data)
    console.log("add data is",data);
    ;
    }

    navigate("/manage-notice");
  };
;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-blue-700 text-center">
        {isEdit ? "Update Notice" : "Publish New Notice"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          {...register("title")}
          placeholder="Notice Title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
         {errors.title && (
    <p className="text-red-600 mt-1">{errors.title.message}</p>
  )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body
        </label>
        <textarea
          {...register("body")}
          placeholder="Notice Body"
          rows={4}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.body && (
    <p className="text-red-600 mt-1">{errors.body.message}</p>
  )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expiry Date
        </label>
        <input
          type="date"
          {...register("expires_at")}
          min={today}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
         {errors.expires_at && (
    <p className="text-red-600 mt-1">{errors.expires_at.message}</p>
  )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {isEdit ? "Update Notice" : "Publish Notice"}
      </button>
    </form>
  );
};

export default NoticeForm;
