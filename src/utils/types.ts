import { LucideIcon } from "lucide-react";

export type actionFunction = (
  prevSate: any,
  formData: any,
) => Promise<{ message: string }>;

export type SelectOption = {
  label?: string;
  icon?: LucideIcon;
  PROVINCE_NAME?: string;
  PROVINCE_ID?: number;
};
