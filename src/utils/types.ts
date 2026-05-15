import { LucideIcon } from "lucide-react";

export type actionFunction = (
  prevSate: any,
  formData: any,
) => Promise<{ message: string; code?: number }>;

export type SelectOption = {
  label?: string;
  icon?: LucideIcon;
  PROVINCE_NAME?: string;
  PROVINCE_ID?: number;
};

export type LandmarkCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  province: string;
  price: number;
  lat: number;
  lng: number;
};
