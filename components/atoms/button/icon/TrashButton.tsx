import { Trash2 } from "lucide-react";

interface BookCartProps {
  onClick: () => void;
}

export const TrashButton = ({ onClick }: BookCartProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="bg-destructive text-destructive-foreground p-1.5 rounded-full hover:bg-destructive/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
      title="북카트에서 제거하기"
    >
      <Trash2 size={20} />
    </button>
  );
};
