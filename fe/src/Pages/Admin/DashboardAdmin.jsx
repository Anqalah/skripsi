import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../Features/authSlice";
import AdminLayout from "../../components/Layouts/AdminLayout";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <AdminLayout>
      <div class="w-full px-6 py-8">
        <div class="mx-auto">
          <div class="bg-white rounded-3xl p-8 mb-5">
            <h1 class="text-3xl font-bold mb-10">
              Website Integrasi Sistem Absensi LPK MALEO GOGAKUIN PALU
            </h1>
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-stretch">
                <div class="text-gray-400 text-xs">Senin, 20 April 2034</div>
                <div class="h-100 border-l mx-4"></div>
                <div class="flex flex-nowrap -space-x-3">
                  <div class="h-9 w-9">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      src="https://ui-avatars.com/api/?background=random"
                    />
                  </div>
                  <div class="h-9 w-9">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      src="https://ui-avatars.com/api/?background=random"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-x-20">
              <div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-2">
                    <div class="p-4 bg-green-100 rounded-xl">
                      <div class="font-bold text-xl text-gray-800 leading-none">
                        Absen Siswa
                      </div>
                      <div class="mt-5">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                        >
                          Lihat Semua
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 bg-yellow-100 rounded-xl text-gray-800">
                    <div class="font-bold text-2xl leading-none">20</div>
                    <div class="mt-2">Guru</div>
                  </div>
                  <div class="p-4 bg-yellow-100 rounded-xl text-gray-800">
                    <div class="font-bold text-2xl leading-none">5,5</div>
                    <div class="mt-2">Siswa</div>
                  </div>
                  <div class="col-span-2">
                    <div class="p-4 bg-purple-100 rounded-xl text-gray-800">
                      <div class="font-bold text-xl leading-none">
                        Kelas Absen Terbaik
                      </div>
                      <div class="mt-2">Pertanian A</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="space-y-4">
                  <div class="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                    <div class="flex justify-between">
                      <div class="text-gray-400 text-xs">Keterangan</div>
                      <div class="text-gray-400 text-2xl">20</div>
                    </div>
                    <p class="font-bold hover:text-yellow-800">
                      Hadir Terbanyak
                    </p>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <img
                        src="/images/logo.jpg"
                        className="w-6 h-6 rounded-full"
                      />
                      <p>Muhammad Fadhil</p>
                    </div>
                  </div>
                  <div class="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                    <div class="flex justify-between">
                      <div class="text-gray-400 text-xs">Keterangan</div>
                      <div class="text-gray-400 text-2xl">20</div>
                    </div>
                    <p class="font-bold hover:text-yellow-800">
                      Izin Terbanyak
                    </p>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <img
                        src="/images/logo.jpg"
                        className="w-6 h-6 rounded-full"
                      />
                      <p>Muhammad Fadhil</p>
                    </div>
                  </div>
                  <div class="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                    <div class="flex justify-between">
                      <div class="text-gray-400 text-xs">Keterangan</div>
                      <div class="text-gray-400 text-2xl">20</div>
                    </div>
                    <p class="font-bold hover:text-yellow-800">
                      Alpa Terbanyak
                    </p>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <img
                        src="/images/logo.jpg"
                        className="w-6 h-6 rounded-full"
                      />
                      <p>Muhammad Fadhil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
