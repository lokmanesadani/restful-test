import axios from "axios";
export const privateAxios = axios.create({
  BASE_URL: import.meta.env.VITE_API_URL,

  // axios headers config content type

  withCredentials: true,
});
export default axios.create({
  BASE_URL: import.meta.env.VITE_API_URL,

  // axios headers config content type

  withCredentials: true,
});
