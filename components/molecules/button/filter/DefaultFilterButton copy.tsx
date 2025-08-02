import { Plus } from "lucide-react";
import { BookSearchFilterButton } from "./BookSearchFilterButton";

interface DefaultFilterButtonProps {
  text: string;
  href: string;
}

export const DefaultFilterButton = async ({
  text,
  href,
}: DefaultFilterButtonProps) => {
  return (
    <BookSearchFilterButton
      text={text}
      buttonClassName="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105"
      Icon={Plus}
      href={href}
    />
  );
};
