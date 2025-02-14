"use client";

import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { CardTitleLabel } from "../atoms/label/CardLabel";
import { CloseButton } from "../atoms/button/CloseButton";
import { PopupHeader } from "../molecules/header/PopupHeader";

interface MapPopupProps {
  onConfirm: (location: { lat: number; lng: number }) => void;
  onClose: () => void;
}

export default function MapPopup({ onConfirm, onClose }: MapPopupProps) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleConfirm = () => {
    onConfirm(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-xl w-full max-w-md">
        <PopupHeader headerName="위치 선택" onClose={onClose} />
        {/* Here you would typically integrate a map component */}
        <div className="w-full h-64 bg-muted mb-4 flex items-center justify-center">
          <MapPin size={48} className="text-muted-foreground" />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors animate-in zoom-in-50 duration-200"
          >
            위치 확인
          </button>
        </div>
      </div>
    </div>
  );
}
