import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/features/tokenSlice";
import axios from "axios";
const useRefresh = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const refresh = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/refresh`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setToken(response.data?.token));
    return response.data?.token;
  };

  return refresh;
};

export default useRefresh;
