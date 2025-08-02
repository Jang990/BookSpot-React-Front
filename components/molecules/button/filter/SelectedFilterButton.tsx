import { X } from "lucide-react";
import { BookSearchFilterButton } from "./BookSearchFilterButton";

interface SelectedFilterButtonProps {
  text: string;
  href: string;
}

export const SelectedFilterButton = async ({
  text,
  href,
}: SelectedFilterButtonProps) => {
  return (
    <BookSearchFilterButton
      text={text}
      buttonClassName="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105"
      Icon={X}
      href={href}
    />
  );
};
