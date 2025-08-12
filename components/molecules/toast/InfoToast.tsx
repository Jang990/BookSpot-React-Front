"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number; // ms
  type?: "INFO" | "WARN";
}

export const InfoToast = ({
  message,
  onClose,
  duration = 1500,
  type = "INFO",
}: ToastProps) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Show animation
    setIsVisible(true);

    // Progress bar animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        handleClose();
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const offset = touch.clientY - rect.top - rect.height / 2;
    setDragOffset(Math.max(0, offset)); // Only allow downward drag
  };

  const handleTouchEnd = () => {
    if (dragOffset > 50) {
      handleClose();
    } else {
      setDragOffset(0);
    }
    setIsDragging(false);
  };

  const getColorClasses = () => {
    switch (type) {
      case "WARN":
        return {
          bg: "bg-red-600",
          border: "border-red-500",
          progress: "bg-red-400",
          text: "text-white",
        };
      case "INFO":
      default:
        return {
          bg: "bg-primary/90",
          border: "border-primary/80",
          progress: "bg-primary/70",
          text: "text-white",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div
      className={`
        fixed z-50
        ${colors.bg} ${colors.border} ${colors.text}
        border rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        ${isDragging ? "transition-none" : ""}
        bottom-4 left-4 right-4 mx-auto max-w-sm
        md:bottom-4 md:right-4 md:left-auto md:max-w-96 md:min-w-80
        ${isVisible && !isDragging ? "md:translate-x-0" : ""}
        ${!isVisible ? "translate-y-full md:translate-y-0 md:translate-x-full" : ""}
      `}
      style={{
        transform: isDragging
          ? `translateY(${dragOffset}px) scale(${1 - dragOffset * 0.002})`
          : undefined,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main content */}
      <div className="p-4 pr-12 relative">
        <p className="text-sm font-medium leading-relaxed">{message}</p>

        {/* Close button */}
        <button
          onClick={handleClose}
          className={`
            absolute top-3 right-3
            p-1 rounded-full
            hover:bg-black/10 active:bg-black/20
            transition-colors duration-150
            ${colors.text}
            md:p-1 p-2
          `}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-black/20 rounded-b-lg overflow-hidden">
        <div
          className={`h-full ${colors.progress} transition-all duration-75 ease-linear rounded-b-lg`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
};
