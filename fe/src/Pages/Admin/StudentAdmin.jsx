import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import { API_BASE_URL } from "../../config/config";
import { Link } from "react-router-dom";
import Button from "../../components/Elements/Button";
import axios from "axios";

const StudentAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`${API_BASE_URL}/students/${userId}`);
    getUsers();
  };

  return (
    <AdminLayout>
      <Link to="add">
        <Button classname="flex my-1 py-2 px-3  bg-green-600">Tambah</Button>
      </Link>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nama
              </th>
              <th scope="col" class="px-6 py-3">
                Jurusan
              </th>
              <th scope="col" class="px-6 py-3">
                Kelas
              </th>
              <th scope="col" class="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.uuid}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.bidang}</td>
                <td className="px-6 py-4">{user.kelas}</td>
                <td className="flex items-center justify-center gap-2 py-2">
                  <Link to={`/student/edit/${user.uuid}`}>
                    <Button classname="px-6 py-1 rounded-lg bg-blue-700 text-white">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteUser(user.uuid)}
                    classname="px-6 py-1 rounded-lg bg-red-700 text-white"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default StudentAdmin;
