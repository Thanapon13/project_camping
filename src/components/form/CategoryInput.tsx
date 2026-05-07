import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/category";

const CategoryInput = ({ defaultValue }: { defaultValue?: string }) => {
  const name = "category";

  return (
    <div>
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>

      <Select
        name={name}
        defaultValue={defaultValue || categories[0].label}
        required
      >
        <SelectTrigger className="w-full max-w-48 h-8">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {categories?.map((el, idx) => {
            return (
              <SelectItem
                key={idx}
                value={el?.label}
                className="cursor-pointer text-sm"
              >
                <span className="capitalize flex items-center gap-4">
                  <el.icon className="h-5 w-5" />
                  {el?.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryInput;
