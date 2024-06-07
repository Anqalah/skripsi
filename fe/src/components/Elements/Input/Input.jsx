// const Input = (props) => {
//   const { type, placeholder, name } = props;
//   return (
//     <input
//       type={type}
//       className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder: opacity-50"
//       placeholder={placeholder}
//       name={name}
//       id={name}
//     />
//   );
// };

import React from "react";

const Input = ({ type, id, className, ...props }) => {
  return (
    <input
      type={type}
      id={id}
      className={`w-full px-4 py-2 border border-slate-400 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
      {...props}
    />
  );
};

export default Input;
