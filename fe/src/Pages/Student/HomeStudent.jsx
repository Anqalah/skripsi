import React from "react";
import StudentLayout from "../../components/Layouts/StudentLayout";

const HomeStudent = () => {
  return (
    <StudentLayout>
      <div className="">
        <div className="flex flex-col items-center gap-5">
          <img
            src="/images/logo.jpg"
            alt="profile"
            className="w-24 h-24 bg-black rounded-lg"
          />
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">Muhammad Bilal</p>
            <p className="italic text-xl">Pertanian</p>
            <p className="font-semibold text-lg">Kelas A</p>
          </div>
          <div className="w-full flex items-center justify-around">
            <div className="flex flex-col justify-center items-center px-5 py-3 rounded-lg border">
              <p className="text-3xl">10</p>
              <p className="text-base">Hadir</p>
            </div>
            <div className="flex flex-col justify-center items-center px-5 py-3 rounded-lg border">
              <p className="text-3xl">10</p>
              <p className="text-base">Izin</p>
            </div>
            <div className="flex flex-col justify-center items-center px-5 py-3 rounded-lg border">
              <p className="text-3xl">10</p>
              <p className="text-base">Alpa</p>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button className="px-10 py-2 rounded-lg bg-slate-300">
              Isi Kehadiran
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default HomeStudent;
