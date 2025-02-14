import { MapPin } from "lucide-react";

interface GpsButtonProps {
  onClick: () => void;
}

export const GpsButton = ({ onClick }: GpsButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center"
    >
      <MapPin className="mr-2" size={20} />
      소장 도서관 찾기
    </button>
  );
};
