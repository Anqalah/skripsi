// import { Link } from "react-router-dom";

// const AuthLayout = (props) => {
//   const { children, title, type } = props;
//   return (
//     <div className="flex justify-center min-h-screen items-center">
//       <div className="w-full max-w-xs">
//         <h1 className="text-3xl font-bold md-2 py-4 text-blue-600">{title}</h1>
//         <p className="font-medium text-slate-500 mb-8">
//           Selamat Datang, Silahkan masukkan akun anda
//         </p>
//         {children}
//         <p className="text-sm mt-5 text-center ">
//           {type === "login" ? " Belum punya akun?" : " Sudah punya akun?"}{" "}
//           {type === "login" ? (
//             <Link to="/register" className="font-bold text-[#457b9d]">
//               Daftar
//             </Link>
//           ) : (
//             type === "register" && (
//               <Link to="/login" className="font-bold text-[#457b9d]">
//                 Masuk
//               </Link>
//             )
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };
// export default AuthLayout;

const AuthLayout = ({ title, subtitle, linkText, linkHref, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blueMain">
      <div className="flex bg-white shadow-2xl rounded-lg max-w-3xl w-full">
        <div className="w-1/2 p-8 bg-purple-600 text-white rounded-r-[70px]">
          <h2 className="text-4xl mb-4">{title}</h2>
          <p className="mb-6">{subtitle}</p>
          <a
            href={linkHref}
            className="px-4 py-2 bg-white text-black rounded-full"
          >
            {linkText}
          </a>
          <img
            src="undone.svg"
            alt="Gambar"
            className="w-1/2 itemns-center justify-center"
          />
        </div>
        <div className="w-1/2 p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
