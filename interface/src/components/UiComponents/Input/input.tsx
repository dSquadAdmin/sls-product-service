import React from 'react'

interface IProps {
    name: string;
    redacted: boolean;
    label: string;
    isError: boolean;
    placeholder: string;
    message: string;
    onChange: (value:any)=>void;
}
const InputField = (props: IProps) => {
    const {
        name,
        redacted,
        label,
        isError,
        placeholder,
        message,
        onChange
    } = props;
    const errClass = isError ? 'border-red-500' : '';

    return (
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
            {label}
        </label>
        <input 
            className={`shadow appearance-none border ${errClass} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password" type={redacted ? "password" : "text"} 
            placeholder={placeholder} 
            onChange={onChange}
        />
        {isError && <p className="text-red-500 text-xs italic">{message}</p>}
        </div>
    );
};

export default InputField;
