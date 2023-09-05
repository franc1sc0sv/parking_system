import React from "react";

const InputField = ({ label, type, id, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
