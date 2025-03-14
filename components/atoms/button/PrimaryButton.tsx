"use client";

import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const PrimaryButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-primary text-primary-foreground px-5 py-2.5 rounded-md 
        hover:bg-primary/90 transition-colors flex items-center justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};
