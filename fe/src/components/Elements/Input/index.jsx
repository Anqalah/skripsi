import Label from "./Label";
import Input from "./Input";

export const InputForm = (props) => {
  const { name, label, type, placeholder, value, onchange } = props;
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onchange={onchange}
      />
    </div>
  );
};
