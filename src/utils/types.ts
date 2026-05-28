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
  profileId: string;
  favoriteId: string | null;
};

export type ReplyProps = {
  id: string;
  comment: string;
  rating: number;
  createdAt: Date;
  profileId: string;
  profile: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
};

export type CommentProps = {
  id: string;
  comment: string;
  rating: number;
  createdAt: Date;
  profileId: string;
  landmarkId: string;
  profile: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  replies: ReplyProps[]; // ← เพิ่มตรงนี้
};

export type FromPageType = "home" | "favorites";
