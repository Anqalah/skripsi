import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams untuk mendapatkan id
import StudentLayout from "../../components/Layouts/StudentLayout";

const ClockInResults = () => {
  const [clockInData, setClockInData] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil id dari URL params

  useEffect(() => {
    fetchClockInData();
  }, [id]); // Tambahkan id sebagai dependensi

  const fetchClockInData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/attendances/clockin-result/${id}`
      );
      setClockInData(response.data);
    } catch (error) {
      console.error("Error fetching clock-in data: ", error);
      setMessage(error.response?.data?.msg || "Failed to load clock-in data.");
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Hasil Clock In Siswa</h2>

        {message && <p className="text-red-500">{message}</p>}

        {clockInData ? (
          <div className="space-y-4">
            <p>
              <strong>Nama:</strong> {clockInData.name}
            </p>
            <p>
              <strong>Latitude:</strong> {clockInData.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {clockInData.longitude}
            </p>
            <p>
              <strong>Waktu Clock In:</strong>{" "}
              {new Date(clockInData.clockInTime).toLocaleString()}
            </p>
            {clockInData.facePhoto && (
              <div>
                <h3 className="text-lg font-semibold">Foto Wajah:</h3>
                <img
                  src={clockInData.facePhoto}
                  alt="Clock-in face"
                  className="w-full border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Loading clock-in data...</p>
        )}

        <button
          onClick={() => navigate("/student/dashboard")}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </StudentLayout>
  );
};

export default ClockInResults;
