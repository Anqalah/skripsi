// RegisterPage.jsx
import { useState } from "react";
import AuthLayout from "../Layouts/AuthLayouts";
import { Link } from "react-router-dom";
import { CameraIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [faceData, setFaceData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleFaceSubmit = (faceImages) => {
    setFaceData(faceImages);
    console.log("Final Submission:", { ...formData, faceData: faceImages });
    alert("Registrasi berhasil!");
  };

  return (
    <AuthLayout
      title={currentStep === 1 ? "Daftar Akun Baru" : "Verifikasi Wajah"}
      type="register"
      currentStep={currentStep}
    >
      {currentStep === 1 ? (
        <PersonalDataForm
          initialValues={formData}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <FaceVerification
          onBack={() => setCurrentStep(1)}
          onSubmit={handleFaceSubmit}
        />
      )}
    </AuthLayout>
  );
};

const PersonalDataForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-[#4A5568] mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[#2A4365]/20 focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A5568] mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-[#2A4365]/20 focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A5568] mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-[#2A4365]/20 focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4A5568] mb-2">
            Konfirmasi Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-[#2A4365]/20 focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20 transition-all"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#2A4365] hover:bg-[#D4AF37] text-white py-3.5 px-6 rounded-lg font-semibold 
                   transition-colors shadow-sm hover:shadow-md"
      >
        Lanjutkan Verifikasi
      </button>
    </form>
  );
};

const FaceVerification = ({ onBack, onSubmit }) => {
  const [images, setImages] = useState([]);

  const handleTakePhoto = () => {
    const fakeImages = ["photo1", "photo2", "photo3"];
    setImages(fakeImages);
    onSubmit(fakeImages);
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-[#4A5568] hover:text-[#2A4365] transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Kembali ke Form Data Diri
      </button>

      <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
        <div className="mx-auto mb-4 w-32 h-32 bg-[#4A5568]/10 rounded-full flex items-center justify-center">
          <CameraIcon className="w-12 h-12 text-[#4A5568]/40" />
        </div>
        <p className="text-[#4A5568] text-sm mb-4">
          Pastikan wajah terlihat jelas dengan pencahayaan cukup
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {images.map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-[#2A4365]/20 rounded-full flex items-center justify-center"
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  index < images.length ? "bg-[#2A4365]" : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleTakePhoto}
          className="w-full bg-[#2A4365] hover:bg-[#D4AF37] text-white py-3.5 px-6 rounded-lg font-semibold 
                     transition-colors shadow-sm hover:shadow-md"
        >
          {images.length < 3
            ? "Ambil Foto Berikutnya"
            : "Selesaikan Verifikasi"}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
