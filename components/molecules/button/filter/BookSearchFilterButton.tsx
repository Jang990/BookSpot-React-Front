import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  text: string;
  Icon: LucideIcon;
  selected?: boolean;
  isBlinking?: boolean;
}

export const BookSearchFilterButton = ({
  href,
  text,
  Icon,
  selected = false,
}: ButtonProps) => {
  return (
    <Link href={href} className="m-1">
      <Button
        variant="ghost"
        size="sm"
        className={`
          text-xs transition-all duration-200 hover:scale-105
          rounded-lg border-2 px-1.5 py-1
          ${selected ? "border-primary bg-primary/10 shadow-sm text-primary" : "border-muted text-muted-foreground"}
          hover:border-primary/50 
          hover:text-primary
          hover:bg-primary/5 hover:shadow-md
          group
        `}
      >
        <Icon
          className={`
            mr-0.5 h-3 w-3 transition-all duration-200
            ${selected ? "text-primary" : `group-hover:scale-110`}
            group-hover:rotate-12
          `}
        />
        <span className="font-semibold">{text}</span>
      </Button>
    </Link>
  );
};

// 간단한 문자열->정수 해시 (안민감, deterministic)
function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
