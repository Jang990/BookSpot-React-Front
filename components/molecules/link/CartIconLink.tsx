import { CornerBadge } from "@/components/atoms/label/CornerBadge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartIconLinkProps {
  href: string;
  cartSize: number;
}

export const CartIconLink = ({ href, cartSize: size }: CartIconLinkProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);

    // 애니메이션 완료 후 상태 리셋
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 700); // 덜컹거림 지속 시간을 700ms로 증가

    return () => clearTimeout(timer);
  }, [size]);

  return (
    <a href={href} className="text-primary hover:text-primary/80 relative">
      <ShoppingCart
        size={24}
        className={`${isAnimating ? "animate-bump" : ""}`}
      />

      {size > 0 && (
        <CornerBadge
          label={size.toString()}
          className={`${isAnimating ? "animate-bump" : ""}`}
        />
      )}
    </a>
  );
};
