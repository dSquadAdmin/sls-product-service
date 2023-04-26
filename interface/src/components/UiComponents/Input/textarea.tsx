import React from "react";

interface IProps {
  name: string;
  placeholder: string;
  rows?: number;
  label: string;
  value: string;
  message: string;
  isError: boolean;
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
    isError
  } = props;
  const errClass = isError ? "border-red-500" : "";

  return (
    <div key={name} className="relative mb-3" data-te-input-wrapper-init>
      <textarea
        className={`shadow appearance-none border ${errClass} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        id={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
      ></textarea>
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >
        {label}
      </label>
      {isError && <p className="text-red-500 text-xs italic">{message}</p>}
    </div>
  );
};
