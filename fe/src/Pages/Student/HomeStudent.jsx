import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/Layouts/StudentLayout";
import { getMe } from "../../Features/authSlice";

const HomeStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      const action = await dispatch(getMe());
      if (getMe.rejected.match(action)) {
        navigate("/");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  if (!authUser) return null;

  return (
    <StudentLayout>
      <div className="">
        <div className="flex flex-col items-center gap-5">
          <img
            src="/images/logo.jpg"
            alt="profile"
            className="w-24 h-24 bg-black rounded-lg"
          />
          <div className="text-center">
            <p className="text-2xl font-semibold">{authUser.name}</p>
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
