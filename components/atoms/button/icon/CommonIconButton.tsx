"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, index) => {
          const handleSelect = (e: Event) => {
            e.preventDefault();
            item.onClick();
            setIsOpen(false);
          };

          return (
            <DropdownMenuItem
              key={index}
              onSelect={handleSelect}
              disabled={item.disabled}
              className="flex items-center gap-3 cursor-pointer"
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
