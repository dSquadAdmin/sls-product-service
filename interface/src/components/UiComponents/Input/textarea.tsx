import React from "react";

interface IProps {
  name: string;
  placeholder: string;
  rows?: number;
  label: string;
  value: string;
  message: string;
  isError: boolean;
  required?: boolean;
  onChange: (value: any) => void;
}

export const TextArea = (props: IProps) => {
  const {
    name,
    placeholder,
    rows,
    label,
    value,
    message,
    isError,
    required,
    onChange
  } = props;
  const errClass = isError ? "border-red-500" : "";

  return (
    <div key={name} className="relative mb-3" data-te-input-wrapper-init>
      <div
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label} {required && "*"}
      </div>
      <textarea
        className={`shadow appearance-none border ${errClass} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        id={name}
        rows={rows}
        value={value}
        placeholder={ placeholder}
        onChange={(ev)=>onChange(ev)}
      ></textarea>
      {isError && <p className="text-red-500 text-xs italic">{message}</p>}
    </div>
  );
};
