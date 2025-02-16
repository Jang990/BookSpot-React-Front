"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { PopupHeader } from "../molecules/header/PopupHeader";
import { GpsConfirmButton } from "../atoms/button/GpsConfirmButton";

interface MapPopupProps {
  onConfirm: (location: { lat: number; lng: number }) => void;
  onClose: () => void;
}

export default function MapPopup({ onConfirm, onClose }: MapPopupProps) {
  const [location, setLocation] = useState({
    lat: 37.5211992,
    lng: 126.7458861,
  });

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
          <GpsConfirmButton onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
