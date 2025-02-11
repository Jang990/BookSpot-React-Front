import { useBookCart } from "@/contexts/BookCartContext";
import { Trash2 } from "lucide-react";

interface BookCartProps {
  bookId: string;
}

export const RemoveFromCartButton = ({ bookId }: BookCartProps) => {
  const { removeFromCart } = useBookCart();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        removeFromCart(bookId);
      }}
      className="bg-destructive text-destructive-foreground p-1.5 rounded-full hover:bg-destructive/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
    >
      <Trash2 size={20} />
    </button>
  );
};
