import Label from "./Label";
import Input from "./Input";

// const InputForm = (props) => {
//   const { name, label, type, placeholder } = props;
//   return (
//     <div className="mb-6">
//       <Label htmlFor={name}>{label}</Label>
//       <Input name={name} type={type} placeholder={placeholder} />
//     </div>
//   );
// };
// export default InputForm

const FormInput = ({ label, id, type, ...props }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} {...props} />
    </div>
  );
};

export default FormInput;

// export default InputForm;
