import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
  value,
  onChange,
}: {
  name: string;
  labelText?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>

      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        rows={5}
        required
      />
    </div>
  );
};

export default TextAreaInput;
