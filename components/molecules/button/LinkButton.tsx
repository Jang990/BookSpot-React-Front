import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkButtonProps {
  text: string;
  href: string;
}

export const LinkButton = ({ text, href }: LinkButtonProps) => {
  return (
    <Link href={href} className="m-1">
      <Button
        variant="ghost"
        size="sm"
        className={`
          text-xs transition-all duration-200 hover:scale-105
          rounded-lg border-2 px-2 py-1 inline-flex items-center
          border-blue-200 text-blue-400 bg-blue-50
          hover:border-blue-400
          hover:text-blue-600
          hover:bg-blue-100 hover:shadow-md
          group
        `}
      >
        <span className="font-semibold">{text}</span>
      </Button>
    </Link>
  );
};
