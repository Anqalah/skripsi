import React from "react";
import Button from "./components/Elements/Button";

function App() {
  return (
    <div className="flex justify-center bg-slate-600 min-h-screen items-center">
      <div className="flex gap-x-3">
        <Button variant="bg-blue-700">Login</Button>
        <Button variant="bg-red-700">Logout</Button>
        <Button variant="bg-black">Register</Button>
      </div>
    </div>
  );
}

export default App;
