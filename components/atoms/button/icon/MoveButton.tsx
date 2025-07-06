import { Navigation } from "lucide-react";

interface BookCartProps {
  onClick: () => void;
}

export const MoveButton = ({ onClick }: BookCartProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-secondary/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
    >
      <Navigation size={20} className="relative -left-0.5 top-0.5" />
    </button>
  );
};
