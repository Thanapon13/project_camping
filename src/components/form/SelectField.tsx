import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "@/utils/types";

const SelectField = ({
  defaultValue,
  name,
  data,
  onValueChange,
}: {
  defaultValue?: string;
  name: string;
  data: SelectOption[];
  onValueChange?: (value: string) => void;
}) => {
  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>

      <Select
        name={name}
        defaultValue={defaultValue || data[0].label || data[0].PROVINCE_NAME}
        required
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-full h-8">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {data?.map((el, idx) => {
            const value = el.label || el.PROVINCE_NAME || "";
            const Icon = el.icon;
            return (
              <SelectItem
                key={idx}
                value={value}
                className="cursor-pointer text-sm"
              >
                <span className="capitalize flex items-center gap-4">
                  {Icon && <Icon className="h-5 w-5" />}
                  {value}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
