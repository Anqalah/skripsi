// const Label = (props) => {
//   const { htmlFor, children } = props;
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="block text-slate-700 text-sm font-bold mb-2"
//     >
//       {children}
//     </label>
//   );
// };

const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1 text-textMain ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
