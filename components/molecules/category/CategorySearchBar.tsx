"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CategorySearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CategorySearchBar({
  value,
  onChange,
  placeholder = "분류 검색...",
}: CategorySearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
