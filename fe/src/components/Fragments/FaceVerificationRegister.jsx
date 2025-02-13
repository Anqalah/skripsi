import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Elements/Button";
import {
  ArrowLeftIcon,
  CameraIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import AuthLayout from "../Layouts/AuthLayouts";

const FaceVerificationRegister = ({ onBack, onSubmit }) => {
  const videoRef = useRef(null);
  const [instructions] = useState([
    "Hadapkan wajah lurus ke kamera",
    "Miringkan kepala ke kiri",
    "Miringkan kepala ke kanan",
    "Angkat kepala ke atas",
  ]);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        videoRef.current.srcObject = stream;
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
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImages((prev) => [...prev, imageData]);

    if (currentInstruction < instructions.length - 1) {
      setCurrentInstruction((prev) => prev + 1);
    } else {
      onSubmit([...capturedImages, imageData]);
    }
  };
  return (
    <AuthLayout type={"verification"} title={"Daftar Akun Baru"}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-[#4A5568] hover:text-[#2A4365] transition-colors"
          >
            <Link to="/register">
              <ArrowLeftIcon className="w-6 h-6 mr-2" />
              <span className="font-medium">Kembali</span>
            </Link>
          </button>
        </div>

        {/* Video Preview */}
        <div className="relative bg-[#F5F7FA] rounded-2xl p-4 shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-96 object-cover rounded-xl border-4 border-[#2A4365]/10"
          />

          {/* Overlay Instruction */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2A4365]/30 backdrop-blur-sm">
            <div className="text-center text-white p-6 rounded-2xl bg-[#2A4365]/90">
              <p className="text-2xl font-bold mb-3">
                {instructions[currentInstruction]}
              </p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircleIcon
                  className={`w-6 h-6 ${
                    capturedImages[currentInstruction]
                      ? "text-[#D4AF37]"
                      : "text-white/30"
                  }`}
                />
                <span className="font-medium">
                  Langkah {currentInstruction + 1} dari {instructions.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Capture Button */}
        <Button
          variant={
            currentInstruction === instructions.length - 1
              ? "success"
              : "primary"
          }
          onClick={captureFace}
          className="w-full py-4 text-lg"
        >
          <div className="flex items-center justify-center gap-3">
            <CameraIcon className="w-6 h-6" />
            {currentInstruction < instructions.length - 1
              ? "Ambil Foto"
              : "Selesaikan Verifikasi"}
          </div>
        </Button>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-3">
          {Array.from({ length: instructions.length }).map((_, index) => (
            <div
              key={index}
              className={`w-12 h-1 rounded-full ${
                index <= currentInstruction ? "bg-[#D4AF37]" : "bg-[#4A5568]/20"
              }`}
            />
          ))}
        </div>
      </div>
    </AuthLayout>
  );
};

export default FaceVerificationRegister;
