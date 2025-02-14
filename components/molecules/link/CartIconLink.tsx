import { CornerBadge } from "@/components/atoms/label/CornerBadge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartIconLinkProps {
  href: string;
  cartSize: number;
}

export const CartIconLink = ({ href, cartSize: size }: CartIconLinkProps) => {
  return (
    <Link href={href} className="text-primary hover:text-primary/80 relative">
      <ShoppingCart size={24} />

      {size > 0 && <CornerBadge label={size.toString()} />}
    </Link>
  );
};
