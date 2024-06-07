
import Button from "../Elements/Button";

// const FormLogin = () => {
//   return (
//     <form action="">
//       <InputForm
//         label="email"
//         type="email"
//         placeholder="contoh@gmail.com"
//         name="email"
//       />
//       <InputForm
//         label="password"
//         type="password"
//         placeholder="******"
//         name="password"
//       />
//       <Button classname="bg-[#03A9F4] w-full">Login</Button>
//     </form>
//   );
// };
// export default FormLogin;

const FormLogin = ({ type, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="mt-6">
      {children}
      <Button
        type="submit"
        className="mt-4 w-full bg-purple-800 text-white hover:bg-purple-700 transition"
      >
        {type}
      </Button>
    </form>
  );
};

export default FormLogin;
