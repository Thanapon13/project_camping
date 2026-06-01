"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarCardProps = {
  search: string;
  province: string;
  onSearchChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
};

const SearchBarCard = ({
  search,
  province,
  onSearchChange,
  onProvinceChange,
}: SearchBarCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl bg-card border border-border shadow-sm mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search landmarks, temples, beaches..."
          className="pl-11 h-11 border-0 bg-transparent focus-visible:ring-0"
        />
      </div>
      <div className="flex-1 relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={province}
          onChange={e => onProvinceChange(e.target.value)}
          placeholder="Province or location"
          className="pl-11 h-11 border-0 bg-transparent focus-visible:ring-0"
        />
      </div>
    </div>
  );
};

export default SearchBarCard;
