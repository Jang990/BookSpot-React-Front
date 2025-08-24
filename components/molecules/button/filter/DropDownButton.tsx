"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type LucideIcon, ChevronDown } from "lucide-react";

interface DropdownItem {
  type: "link" | "button";
  text: string;
  href?: string; // for link type
  onClick?: () => void; // for button type
}

interface ButtonProps {
  text: string;
  Icon: LucideIcon;
  selected?: boolean;
  items: DropdownItem[];
}

export const DropDownButton = ({
  text,
  Icon,
  selected = false,
  items,
}: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative m-1" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          text-xs transition-all duration-200 hover:scale-105
          rounded-lg border-2 px-1.5 py-1
          ${selected ? "border-primary bg-primary/10 shadow-sm text-primary" : "border-muted text-muted-foreground"}
          hover:border-primary/50 
          hover:text-primary
          hover:bg-primary/5 hover:shadow-md
          group
        `}
      >
        <Icon
          className={`
            mr-0.5 h-3 w-3 transition-all duration-200
            ${selected ? "text-primary" : `group-hover:scale-110`}
            group-hover:rotate-12
          `}
        />
        <span className="font-semibold">{text}</span>
        <ChevronDown
          className={`
            ml-1 h-3 w-3 transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-full bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.type === "link" && item.href ? (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 whitespace-nowrap"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </Link>
                ) : item.type === "button" && item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 whitespace-nowrap"
                  >
                    {item.text}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
