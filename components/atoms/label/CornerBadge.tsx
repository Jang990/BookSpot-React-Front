import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}

export const CornerBadge = ({ label, className }: Props) => {
  return (
    <span
      className={cn(
        "absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] px-1",
        className
      )}
    >
      {label}
    </span>
  );
};
