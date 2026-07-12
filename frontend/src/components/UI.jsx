import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const baseStyle = "w-full py-3 rounded-lg font-semibold text-lg transition-colors flex justify-center items-center";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100",
    outline: "border-2 border-black text-black hover:bg-gray-100 disabled:border-gray-400 disabled:text-gray-400"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, type = 'text', value, onChange, placeholder, icon: Icon, required = false }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative flex items-center">
        {Icon && <div className="absolute left-3 text-gray-500"><Icon size={20} /></div>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full p-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-black outline-none transition-all ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};
