import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

export const CommonIconButton = ({
  icon,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  React;
  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={disabled}>
      {icon}
    </Button>
  );
};

export type DropdownItem = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

interface IconDropdown {
  icon: React.ReactNode;
  items: DropdownItem[];
}

export const CommonIconDropdown = ({ icon, items }: IconDropdown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className="flex items-center gap-2 cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
