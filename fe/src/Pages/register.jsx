import FaceVerificationRegister from "../components/Fragments/FaceVerificationRegister";
import FormRegister from "../components/Fragments/FormRegister";

const RegisterPage = () => {
  return (
    <FormRegister>
      <FaceVerificationRegister />
    </FormRegister>
  );
};

export default RegisterPage;

//       title={currentStep === 1 ? "Daftar Akun Baru" : "Verifikasi Wajah"}
//       type="register"
//       currentStep={currentStep}
//     >
//       {currentStep === 1 ? (
//         <PersonalDataForm
//           initialValues={formData}
//           onSubmit={handleFormSubmit}
//         />
//       ) : (
//         <FaceVerification
//           onBack={() => setCurrentStep(1)}
//           onSubmit={handleFaceSubmit}
//         />
//       )}
// };
