"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmPopupProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  type?: "warning" | "info" | "error";
}

export const ConfirmPopup = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isOpen,
  type = "warning",
}: ConfirmPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return {
          icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
          confirmButton: "bg-amber-500 hover:bg-amber-600 text-white",
        };
      case "error":
        return {
          icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
          confirmButton: "bg-red-500 hover:bg-red-600 text-white",
        };
      case "info":
      default:
        return {
          icon: <AlertTriangle className="h-10 w-10 text-blue-500" />,
          confirmButton: "bg-blue-500 hover:bg-blue-600 text-white",
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start p-4 border-b">
          <div className="flex items-center gap-3">
            {typeStyles.icon}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${typeStyles.confirmButton}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
