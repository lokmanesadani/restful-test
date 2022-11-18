import { useForm } from "react-hook-form";
import statics from "../assets/staticInput";
import FormInput from "../components/formInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
function Login() {
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

  return (
    <div className="w-96  bg-gray-200 rounded-lg p-4">
      <form
        className="flex flex-col items-start"
        onSubmit={handleSubmit((data) => console.log(data))}
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
