import { useState } from "react";
import AuthLayout from "../Layouts/AuthLayouts";
import PersonalDataForm from "../auth/PersonalDataForm";
import FaceVerification from "../auth/FaceVerification";

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
    // Submit all data
    console.log("Final Submission:", { ...formData, faceData: faceImages });
    alert("Registration successful!");
  };

  return (
    <AuthLayout currentStep={currentStep}>
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

export default RegisterPage;
