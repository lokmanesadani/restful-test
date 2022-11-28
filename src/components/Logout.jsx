import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUsername } from "../redux/features/userSlice";
function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setUsername({ username: "", isAuthenticated: false }));
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {});
  };
  return (
    <div
      className="w-32 h-12 bg-green-500 rounded grid place-content-center text-white mt-5 "
      onClick={() => logout()}
    >
      Logout
    </div>
  );
}

export default Logout;
