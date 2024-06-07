// const Button = (props) => {
//   const { children, classname = "bg-black" } = props;
//   return (
//     <button
//       className={`h-10 px-6 font-semibold rounded-md ${classname} text-white`}
//       type="submit"
//     >
//       {children}
//     </button>
//   );
// };

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-800 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
