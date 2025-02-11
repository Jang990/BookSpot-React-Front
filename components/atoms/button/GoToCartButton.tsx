import { useBookCart } from "@/contexts/BookCartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const GoToCartButton = () => {
  const { cart } = useBookCart();

  return (
    <Link href="/cart" className="text-primary hover:text-primary/80 relative">
      <ShoppingCart size={24} />

      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {cart.length}
        </span>
      )}
    </Link>
  );
};
