import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  text: string;
  Icon: LucideIcon;
  selected?: boolean;
}

export const BookSearchFilterButton = ({
  href,
  text,
  Icon,
  selected = false,
}: ButtonProps) => {
  return (
    <Link href={href} className="mx-1 mb-1">
      <Button
        variant="ghost"
        size="sm"
        className={`
          text-xs hover:text-foreground
          hover:bg-muted/50 transition-all duration-200 hover:scale-105
          rounded border
          ${selected ? "border-foreground" : "text-muted-foreground border-muted"}
        `}
      >
        <Icon className="mr-1 h-3 w-3 transition-transform hover:rotate-90" />
        <span>{text}</span>
      </Button>
    </Link>
  );
};
