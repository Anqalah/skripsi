const Button = ({ children, classname = "bg-black", type, onClick }) => {
  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md ${classname} `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
