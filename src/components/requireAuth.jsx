import { useSelector } from "react-redux";
import { Navigate } from "react-router";
function RequireAuth({ children }) {
  let user = useSelector((state) => state.user.value);
  console.log(user);
  return !user.isAuthenticated ? <Navigate to={"/login"} /> : children;
}

export default RequireAuth;
