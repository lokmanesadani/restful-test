import { useForm } from "react-hook-form";
import statics from "../assets/staticInput";
import FormInput from "../components/formInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/features/tokenSlice";
import { setUsername } from "../redux/features/userSlice";
function Login() {
  // navigate to the home page
  const navigate = useNavigate();
  // function that get data from the server using axios
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const loginUser = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setToken(res?.data?.token));
        dispatch(
          setUsername({
            username: data?.username,
            isAuthenticated: true,
          })
        );

        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-96  bg-gray-200 rounded-lg p-4">
      <form
        className="flex flex-col items-start"
        onSubmit={handleSubmit((data) => loginUser(data))}
      >
        <div className="w-full text-2xl font-bold mt-4">Login</div>
        {statics.login.map((input) => (
          <FormInput
            key={input.name}
            reg={register(input.name)}
            placeholder={input.label}
            name={input.name}
            err={errors[input.name]}
            type={input.type}
          />
        ))}

        <input
          className="px-10 py-4 mt-3 self-center bg-blue-500 rounded-lg text-white font-medium"
          type="submit"
        />
        <div className="w-full h-8"></div>
      </form>
    </div>
  );
}

export default Login;
