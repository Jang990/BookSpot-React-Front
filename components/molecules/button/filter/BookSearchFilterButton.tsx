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
          text-xs transition-all duration-200 hover:scale-105
          rounded-lg border-2 px-3 py-2
          ${
            selected
              ? "border-primary bg-primary/10 shadow-sm text-primary"
              : "border-muted text-muted-foreground"
          }
          hover:border-primary/50 
          hover:text-primary
          hover:bg-primary/5 hover:shadow-md
          group
        `}
      >
        <Icon
          className={`
            mr-2 h-4 w-4 transition-all duration-200
            ${selected ? "text-primary" : `group-hover:scale-110`}
            group-hover:rotate-12
          `}
        />
        <span className={`${selected ? "font-semibold" : "font-medium"}`}>
          {text}
        </span>
      </Button>
    </Link>
  );
};
