import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Logout from "../components/Logout";
function Home() {
  // useNavigate to navigate to the home page
  const axiosPrivate = useAxios();

  const navigate = useNavigate();
  const token = useSelector((state) => state.token.value);

  const getProducts = async () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refresh = async () => {
    axiosPrivate
      .get(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="w-32 h-12 bg-red-500 rounded grid place-content-center text-white "
        onClick={() => getProducts()}
      >
        get token
      </div>
      <Logout />
      <div
        className="w-32 h-12 bg-green-500 rounded grid place-content-center text-white mt-5 "
        onClick={() => {
          refresh();
        }}
      >
        Refresh
      </div>
    </>
  );
}

export default Home;
