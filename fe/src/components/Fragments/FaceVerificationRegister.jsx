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
    <AuthLayout type={"verification"} title={"Verifikasi Wajah"}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4">
          <Link
            to="/register"
            className="flex items-center text-[#4A5568] hover:text-[#2A4365] transition-colors group"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex gap-2">
            {instructions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= currentInstruction ? "bg-[#D4AF37]" : "bg-[#4A5568]/20"
                }`}
              />
            ))}
          </div>
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
              <div className="text-center text-white space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircleIcon
                    className={`w-6 h-6 transition-colors ${
                      capturedImages[currentInstruction]
                        ? "text-[#D4AF37]"
                        : "text-white/30"
                    }`}
                  />
                  <span className="font-medium text-sm">
                    Langkah {currentInstruction + 1} dari {instructions.length}
                  </span>
                </div>
                <p className="text-xl font-bold drop-shadow-md">
                  {instructions[currentInstruction]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Section */}
        <div className="space-y-6 px-4">
          <Button
            variant={
              currentInstruction === instructions.length - 1
                ? "success"
                : "primary"
            }
            onClick={captureFace}
            className="w-full py-4 text-lg hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center justify-center gap-3">
              <CameraIcon className="w-6 h-6" />
              <span>
                {currentInstruction < instructions.length - 1
                  ? `Ambil Foto ${currentInstruction + 1}`
                  : "Selesaikan Verifikasi"}
              </span>
            </div>
          </Button>

          {/* Progress Bar */}
          <div className="h-2 bg-[#4A5568]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-500"
              style={{
                width: `${
                  ((currentInstruction + 1) / instructions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default FaceVerificationRegister;
