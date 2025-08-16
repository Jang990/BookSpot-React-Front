import { Plus } from "lucide-react";
import { BookSearchFilterButton } from "./BookSearchFilterButton";

interface DefaultFilterButtonProps {
  text: string;
  href: string;
}

export const DefaultFilterButton = ({
  text,
  href,
}: DefaultFilterButtonProps) => {
  return <BookSearchFilterButton text={text} Icon={Plus} href={href} />;
};
