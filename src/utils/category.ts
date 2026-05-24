import {
  Tent,
  House,
  Mountain,
  Store,
  Utensils,
  Hotel,
  Bed,
  Star,
} from "lucide-react";

export const categories = [
  { id: "all", label: "All", icon: Star },
  {
    id: "camping",
    label: "camping",
    icon: Tent,
  },
  {
    id: "house",
    label: "house",
    icon: House,
  },
  {
    id: "hotel",
    label: "hotel",
    icon: Hotel,
  },
  {
    id: "hostel",
    label: "hostel",
    icon: Bed,
  },
  {
    id: "moutain",
    label: "moutain",
    icon: Mountain,
  },
  {
    id: "store",
    label: "store",
    icon: Store,
  },
  {
    id: "food",
    label: "food",
    icon: Utensils,
  },
];
