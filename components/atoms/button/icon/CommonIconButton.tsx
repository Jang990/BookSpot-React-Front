"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface IconTextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export const IconTextButton = React.forwardRef<
  HTMLButtonElement,
  IconTextButtonProps
>(({ className, children, icon, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors bg-background hover:bg-muted disabled:pointer-events-none",
        className
      )}
      ref={ref}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
});

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
