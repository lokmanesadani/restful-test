import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useEffect, useState } from "react";

import "./App.css";
import Home from "./pages/home";
import RequireAuth from "./components/requireAuth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsername } from "./redux/features/userSlice";
import Authenticated from "./components/Authenticated";

function App() {
  const [isAuthenticated, setUser] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/isAuth`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setUser(true);
        dispatch(setUsername(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return isAuthenticated ? (
    <div className="h-full w-full grid place-content-center">
      <Routes>
        <Route
          path="/login"
          element={
            <Authenticated>
              <Login />
            </Authenticated>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  ) : (
    <div></div>
  );
}

export default App;
