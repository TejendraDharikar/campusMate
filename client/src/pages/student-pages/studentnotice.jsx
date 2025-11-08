import { useNavigate, useSearchParams } from "react-router-dom";
import { useAllNotices } from "../../hooks/useNoticeQuery";
import { useNoticeMutations } from "../../hooks/useNoticeMutations";


const StudentNotice = () => {
 const navigate = useNavigate();
  const { data: notices = [], isLoading, isError } = useAllNotices();
  
  const { deleteNotice } = useNoticeMutations();

console.log("Fetched notices:", notices);

  const handleDelete = (id) => {
    if (window.confirm("Confirm delete this notice?")) {
      deleteNotice(id);
    }
  };

  if (isLoading) return <p>Loading notices...</p>;
  if (isError) return <p>Error loading notices.</p>;

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 text-center pt-4">
          All Notices
      </h2>

      <div className="text-right mb-4">
        {/* <button
          onClick={() => navigate("/noticeform")}
          className="border-2 border-blue-500 px-4 py-2 rounded text-blue-500 font-semibold hover:bg-blue-500 hover:text-white"
        >
          Add Notice
        </button> */}
      </div>

      {notices.length === 0 ? (
        <p className="text-center mt-6">No notices found.</p>
      ) : (
        <table className="w-full bg-white shadow rounded mt-4">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Body</th>
              <th className="p-3">Expires</th>
             
            </tr>
          </thead>
          <tbody className="bg-white">
            {notices.map((notice) => (
              <tr key={notice.id} className="border-t hover:bg-blue-50">
                <td className="p-3 font-semibold">{notice.title}</td>
                <td className="p-3">{notice.body}</td>
                <td className="p-3">{notice.expires_at || "No expiry"}</td>
                <td className="flex p-3 justify-evenly font-semibold">
                  {/* <button
                    onClick={() => navigate(`/noticeform/${notice.id}`)}
                    className="border-2 rounded border-blue-500 px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Update
                  </button> */}
                  {/* <button
                    onClick={() => handleDelete(notice.id)}
                    className="border-2 rounded border-red-500 px-2 py-1 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

};

export default StudentNotice;