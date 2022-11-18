import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import statics from "../assets/staticInput";
import FormInput from "../components/formInput";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

function Signup() {
  /* here we define the yup schema that  
  we are going to use for our sign up form */
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("ok");
  const schema = yup.object().shape({
    username: yup.string().min(6).max(15).required(),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required(),
    email: yup.string().email().required(),
    phone: yup
      .number()
      .test("len", "Must be 10 characters", (val) => val.toString().length == 9)
      .required(),
  });

  /* here we define the useForm and the handler that  
  we are going to use for our sign up form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const registerUser = async (data) => {
    console.log();
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      data
    );
    setMessage(res?.data?.message ?? "");
    setStatus(res?.data?.status ?? "");
  };

  return (
    <div className="w-[28rem] bg-gray-200 rounded-lg p-4">
      <form
        className="flex flex-col items-start"
        onSubmit={handleSubmit((data) => registerUser(data))}
      >
        <div className="w-full text-2xl font-bold mt-4">Signup</div>
        {statics.signup.map((input) => (
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
          className="px-10 py-4 mt-3 self-center bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600 active:bg-blue-700"
          type="submit"
        />
        <div
          className={`w-full h-8 text-[0.8rem] ${
            status === "ok" ? "text-green-400" : "text-red-500"
          }`}
        >
          {message}
        </div>
      </form>
    </div>
  );
}

export default Signup;
