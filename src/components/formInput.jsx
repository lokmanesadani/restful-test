function FormInput(props) {
  return (
    <>
      <label className="w-full mt-4 text-left">{props.placeholder}</label>
      <input
        {...props.reg}
        className={`w-full mt-1 pl-2 p-3 rounded-md ${
          props.err?.message ? "outline-red-500" : ""
        }`}
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
      />

      <p className="text-xs font-semibold flex place-content-center pt-1 text-red-600 text-start">
        {
          // ---------------------- required check ----------------------
          props.err?.type == "required"
            ? `${props.placeholder} is required!`
            : // ---------------------- Type check ----------------------
            props.err?.type == "typeError"
            ? `This is must be a number!`
            : // ----------------------  email check ----------------------
            props.err?.type == "email"
            ? `This is not a valid email!`
            : // ---------------------- length and max and min length or matches ----------------------
            props.err?.type == "min" ||
              props.err?.type == "max" ||
              props.err?.type == "max" ||
              props.err?.type == "matches"
            ? props.err?.message
            : props.err?.message
        }
      </p>
    </>
  );
}

export default FormInput;
