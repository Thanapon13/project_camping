import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useFormState from "@/hooks/useFormState";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

const FormInput = (props: FormInputProps) => {
  const { name, type, label, defaultValue, placeholder } = props;

  return (
    <div className="mb-2">
      <Label htmlFor={name}>{label}</Label>

      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default FormInput;
