import { ShoppingCart } from "lucide-react";

export const EmptyBookCart = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <ShoppingCart size={64} className="text-muted-foreground mb-4" />
      <p className="text-xl text-muted-foreground">북카트가 비어있습니다.</p>
    </div>
  );
};
