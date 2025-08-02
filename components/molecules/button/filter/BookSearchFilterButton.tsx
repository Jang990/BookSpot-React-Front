import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  text: string;
  Icon: LucideIcon;
  buttonClassName?: string;
}

export const BookSearchFilterButton = ({
  href,
  text,
  Icon,
  buttonClassName,
}: ButtonProps) => {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="sm"
        className={`text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105`}
      >
        <Icon className="mr-1 h-3 w-3 transition-transform hover:rotate-90" />
        <span>{text}</span>
      </Button>
    </Link>
  );
};
