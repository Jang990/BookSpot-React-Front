import { useBookCart } from "@/contexts/BookCartContext";
import { ShoppingCart } from "lucide-react";

interface BookCartProps {
  bookId: string;
}

export const AddToCartButton = ({ bookId }: BookCartProps) => {
  const { addToCart } = useBookCart();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(bookId);
      }}
      className="bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-primary/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90"
    >
      <ShoppingCart size={20} />
    </button>
  );
};
