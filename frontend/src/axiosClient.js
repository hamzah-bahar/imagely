import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  }
  // (error) => {
  //   console.error("API error:", error);
  //   const { response } = error;
  //   if (response && response.status === 401) {
  //     localStorage.removeItem("ACCESS_TOKEN");
  //   }
  // }
);

export default axiosClient;
