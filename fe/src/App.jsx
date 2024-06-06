import React from "react";
import InputForm from "./components/Elements/Input";

function App() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold md-2 text-blue-600"></h1>
        <p className="font-medium text-slate-500 mb-8">
          Selamat Datang, Silahkan masukkan akun anda
        </p>
        <form action="">
          <InputForm
            label="email"
            type="email"
            placeholder="contoh@gmail.com"
            name="email"
          />
          <InputForm
            label="password"
            type="password"
            placeholder="******"
            name="password"
          />
        </form>
      </div>
    </div>
  );
}

export default App;
