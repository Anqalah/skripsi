// RegisterPage.jsx
import { useState } from "react";
import AuthLayout from "../Layouts/AuthLayouts";
import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
import Button from "../Elements/Button";

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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konfirmasi Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className=" flex justify-center gap-4 w-full bg-primary hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                   transition-colors shadow-sm hover:shadow-md"
      >
        Verifikasi
      </button>
    </form>
  );
};

const FaceVerification = ({ onBack, onSubmit }) => {
  const [images, setImages] = useState([]);

  const handleTakePhoto = () => {
    // Implement camera capture logic here
    const fakeImages = ["photo1", "photo2", "photo3"];
    setImages(fakeImages);
    onSubmit(fakeImages);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <div className="mx-auto mb-4 w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <CameraIcon className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Pastikan wajah terlihat jelas dengan pencahayaan cukup
        </p>
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <div key={index} className="w-8 h-8 bg-primary rounded-full" />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg border border-gray-200 text-gray-600 
                     hover:bg-gray-50 transition-colors"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={handleTakePhoto}
          className="flex-1 bg-primary hover:bg-blue-600 text-white py-3 px-6 
                     rounded-lg font-semibold transition-colors"
        >
          Ambil Foto
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
