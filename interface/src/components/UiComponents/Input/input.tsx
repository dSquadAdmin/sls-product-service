import React from "react";

interface IProps {
  name: string;
  label: string;
  isError: boolean;
  placeholder: string;
  message: string;
  value?: string|number;
  type: "text"|"number"|"url"|"password";
  onChange: (value: any) => void;
}
const InputField = (props: IProps) => {
  const { name, label, isError, placeholder, message, type, value, onChange } =
    props;
  const errClass = isError ? "border-red-500" : "";

  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border ${errClass} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        id="password"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isError && <p className="text-red-500 text-xs italic">{message}</p>}
    </div>
  );
};

export default InputField;
