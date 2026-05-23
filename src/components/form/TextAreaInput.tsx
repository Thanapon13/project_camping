import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
  value,
  onChange,
  placeholder,
  className,
}: {
  name: string;
  labelText?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    // ถ้าเป็น comment เราจะไม่ใส่ mb-2 เพื่อไม่ให้ฟอร์มเบี้ยว
    <div className={name !== "comment" ? "mb-2" : ""}>
      {/* วิธีเขียนเงื่อนไขซ่อน Label ที่ถูกต้องใน React */}
      {name !== "comment" && (
        <Label htmlFor={name} className="capitalize">
          {labelText || name}
        </Label>
      )}

      <Textarea
        id={name}
        name={name}
        placeholder={placeholder ? placeholder : ""}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        rows={name === "comment" ? 3 : 5}
        required
        className={cn(className)}
      />
    </div>
  );
};

export default TextAreaInput;
