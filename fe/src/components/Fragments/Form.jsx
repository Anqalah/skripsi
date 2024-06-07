import Button from "../Elements/Button";

const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default Form;
