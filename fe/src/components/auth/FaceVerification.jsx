import { useState, useRef, useEffect } from "react";
import Button from "../Elements/Button";

const FaceVerification = ({ onBack, onSubmit }) => {
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
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        alert("Error mengakses kamera: " + error.message);
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
      onSubmit(capturedImages);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Verifikasi Wajah
      </h2>

      <div className="relative bg-gray-100 rounded-xl p-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-64 object-cover rounded-lg"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white bg-black/50 p-4 rounded-lg">
            <p className="text-xl font-bold mb-2">
              {instructions[currentInstruction]}
            </p>
            <p className="text-sm">
              Step {currentInstruction + 1} of {instructions.length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          type="button"
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={onBack}
        >
          Kembali
        </Button>

        <Button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={captureFace}
        >
          {currentInstruction < instructions.length - 1
            ? "Ambil Foto Berikutnya"
            : "Selesaikan Verifikasi"}
        </Button>
      </div>
    </div>
  );
};

export default FaceVerification;
