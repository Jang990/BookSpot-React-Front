"use client";

import type { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "default" | "danger" | "warning";
  disabled?: boolean;
}

export const SecondaryButton = ({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
}: SecondaryButtonProps) => {
  const variantStyles = {
    default: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
    warning: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]} px-5 py-2.5 rounded-md 
        transition-colors flex items-center justify-center border
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};
