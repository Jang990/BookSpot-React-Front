"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModernDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ModernDialog = ({
  isOpen,
  onClose,
  children,
  className,
}: ModernDialogProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-md transform rounded-2xl bg-background shadow-2xl transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

interface ModernDialogHeaderProps {
  children: React.ReactNode;
  description?: string;
  onClose: () => void;
}

export const ModernDialogHeader = ({
  children,
  description,
  onClose,
}: ModernDialogHeaderProps) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground">{children}</h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

interface ModernDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernDialogContent = ({
  children,
  className,
}: ModernDialogContentProps) => {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
};

interface ModernDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernDialogFooter = ({
  children,
  className,
}: ModernDialogFooterProps) => {
  return (
    <div className={cn("px-6 py-4", className)}>
      <div className="flex justify-end gap-2">{children}</div>
    </div>
  );
};
