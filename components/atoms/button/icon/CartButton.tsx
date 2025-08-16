import { ShoppingCart } from "lucide-react";

interface BookCartProps {
  onClick: () => void;
}

export const CartButton = ({ onClick }: BookCartProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-primary/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
      title="북카트에 담기"
    >
      <ShoppingCart size={20} />
    </button>
  );
};
