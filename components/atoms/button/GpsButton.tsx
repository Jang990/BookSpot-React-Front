import { MapPin } from "lucide-react";

interface GpsButtonProps {
  label: string;
  onClick: () => void;
}

export const GpsButton = ({ label, onClick }: GpsButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center"
    >
      <MapPin className="mr-2" size={20} />
      {label}
    </button>
  );
};
