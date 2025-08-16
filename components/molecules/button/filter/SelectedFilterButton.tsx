import { LucideIcon } from "lucide-react";
import { BookSearchFilterButton } from "./BookSearchFilterButton";

interface SelectedFilterButtonProps {
  text: string;
  href: string;
  SelectedIcon: LucideIcon;
}

export const SelectedFilterButton = ({
  text,
  href,
  SelectedIcon,
}: SelectedFilterButtonProps) => {
  return (
    <BookSearchFilterButton
      text={text}
      Icon={SelectedIcon}
      href={href}
      selected={true}
    />
  );
};
