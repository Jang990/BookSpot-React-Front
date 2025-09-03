"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export interface DropdownItem {
  type: "link" | "button";
  text: string;
  href?: string;
  onClick?: () => void;
}

interface IconDropDownProps {
  Icon: LucideIcon; // 아이콘 컴포넌트
  items: DropdownItem[];
  ariaLabel?: string; // 버튼용 aria-label
  align?: "left" | "right"; // 메뉴 정렬 (기본 right)
}

export default function IconDropDownButton({
  Icon,
  items,
  ariaLabel = "open menu",
  align = "right",
}: IconDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowDown" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
        // 포커스는 열리면서 메뉴의 첫 요소로 이동
        setTimeout(() => {
          const first =
            menuRef.current?.querySelector<HTMLElement>("[role=menuitem]");
          first?.focus();
        }, 0);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((v) => !v)}
        className={`inline-flex items-center justify-center p-2 rounded-full transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-transparent`}
      >
        <Icon size={24} className="text-primary" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className={`absolute top-full mt-2 min-w-[120px] max-w-xs rounded-lg border bg-background shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1">
            {items.map((item, idx) => (
              <div key={idx}>
                {item.type === "link" && item.href ? (
                  <Link
                    href={item.href}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 whitespace-nowrap"
                  >
                    {item.text}
                  </Link>
                ) : item.type === "button" && item.onClick ? (
                  <button
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 whitespace-nowrap"
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
}
