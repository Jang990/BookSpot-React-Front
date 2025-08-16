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
  isBlinking = false,
}: ButtonProps) => {
  // 강제: selected면 강조 비활성
  const effectiveHighlight = isBlinking && !selected;

  // 재현 가능한 delay 생성 (href나 index 기반). 0 ~ 1.2s 범위
  const delaySec = `${((hashCode(href) % 120) / 100).toFixed(2)}s`;

  return (
    <Link href={href} className="m-1">
      <Button
        variant="ghost"
        size="sm"
        className={`
          text-xs transition-all duration-200 hover:scale-105
          rounded-lg border-2 px-2 py-1
          ${selected ? "border-primary bg-primary/10 shadow-sm text-primary" : "border-muted text-muted-foreground"}
          hover:border-primary/50 
          hover:text-primary
          hover:bg-primary/5 hover:shadow-md
          group
          ${effectiveHighlight ? "blink-hover" : ""}
        `}
        // CSS custom prop으로 delay 전달
        style={
          effectiveHighlight
            ? { ["--blink-delay" as any]: delaySec }
            : undefined
        }
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

// 간단한 문자열->정수 해시 (안민감, deterministic)
function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
