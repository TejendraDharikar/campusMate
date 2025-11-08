import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//  Fetch all notices
export const fetchAllNotices = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/notices/all`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch notices");
  }
};

//  Fetch notice by ID
export const fetchNoticeById = async (noticeId) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/notices/by-id`, {
      noticeId,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch notice");
  }
};


//  Add new notice
export const addNotice = async (data) => {
    console.log("sending data to backend:",data);
    
  try {
    const res = await axios.post(`${BASE_URL}/api/notices/add`,data);
    console.log("receiving from backend:",res.data);
    
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add notice");
  }
};

//  Update notice
export const updateNotice = async (id, title, body, expiresAt) => {
  console.log("sending data to backend:",id, title, body, expiresAt);
  try {
    const res = await axios.patch(`${BASE_URL}/api/notices/update?id=${id}`, {
      id,
      title,
      body,
      expires_at: expiresAt ?? null,
    });
     console.log("receiving data from backend:",id, title, body, expiresAt);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update notice");
  }
};

// Delete notice
export const deleteNotice = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/notices/delete?id=${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete notice");
  }
};
