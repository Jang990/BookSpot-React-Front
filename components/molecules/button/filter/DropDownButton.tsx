"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type LucideIcon, ChevronDown } from "lucide-react";

interface DropdownItem {
  type: "link" | "button";
  text: string;
  href?: string;
  onClick?: () => void;
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    minWidth: number;
  } | null>(null);

  // 렌더 직전에 위치를 계산 (깜빡임 방지)
  useLayoutEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const minWidth = Math.max(rect.width, 120);

      let left = rect.left + scrollX;
      const top = rect.bottom + scrollY + 6; // 버튼과 드롭다운 사이 간격(6px)
      const viewportWidth = window.innerWidth;

      if (left + minWidth > viewportWidth + scrollX - 8) {
        left = Math.max(8 + scrollX, viewportWidth + scrollX - minWidth - 8);
      }

      setPos({ top, left, minWidth });
    }
  }, [isOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target)) return;
      if (portalRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 윈도우 resize/scroll 시 위치 보정
  useEffect(() => {
    if (!isOpen) return;
    const updatePos = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const minWidth = Math.max(rect.width, 120);

      let left = rect.left + scrollX;
      const top = rect.bottom + scrollY;
      const viewportWidth = window.innerWidth;
      if (left + minWidth > viewportWidth + scrollX - 8) {
        left = Math.max(8 + scrollX, viewportWidth + scrollX - minWidth - 8);
      }

      setPos({ top, left, minWidth });
    };

    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [isOpen]);

  return (
    <div className="relative m-1" ref={wrapperRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen((s) => !s)}
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

      {isOpen &&
        pos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={portalRef}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              minWidth: pos.minWidth,
            }}
            className="bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-150"
          >
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
          </div>,
          document.body
        )}
    </div>
  );
};
