import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Elements/Button";
import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/24/outline";
import AuthLayout from "../Layouts/AuthLayouts";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";

const FaceVerificationRegister = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [token] = useState(new URLSearchParams(location.search).get("token"));
  const [error, setError] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        // Pastikan videoRef.current exist
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        alert("Gagal mengakses kamera: " + error.message);
      }
    };

    initCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureFace = async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.85);

      const response = await axios.post(`${API_BASE_URL}/register/complete`, {
        verification_token: token,
        face_image: imageData,
      });
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Gagal verifikasi wajah");
    }
  };

  return (
    <AuthLayout type={"verification"} title={"Verifikasi Wajah"}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4">
          <Link
            to="/register"
            className="flex items-center text-[#4A5568] hover:text-[#D4AF37] transition-colors group"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium text-[#4A5568] hover:text-[#D4AF37] transition-colors group">
              Kembali
            </span>
          </Link>
        </div>

        {/* Video Container */}
        <div className="relative bg-gradient-to-br from-[#2A4365]/10 to-[#D4AF37]/5 rounded-3xl p-1 shadow-xl">
          <div className="relative overflow-hidden rounded-2xl aspect-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />

            {/* Overlay Instruction */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A4365]/90 to-transparent p-6">
              {/* Control Section */}
              <Button
                onClick={captureFace}
                className="w-full py-4 text-lg hover:scale-[1.02] transition-transform"
              >
                <div className="text-[#2A4365] hover:text-[#D4AF37] transition-colors group flex items-center justify-center gap-3">
                  <CameraIcon className="w-6 h-6" />
                  <span>Selesaikan Verifikasi</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default FaceVerificationRegister;
