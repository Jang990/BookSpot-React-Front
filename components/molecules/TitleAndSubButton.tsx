"use client";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  subButtonText?: string;
  navigateTo: string;
}

export const TitleAndSubButton = ({
  title,
  subButtonText = "더보기",
  navigateTo,
}: Props) => {
  const router = useRouter();

  return (
    <div className="ps-3 mt-2 mb-3 flex items-center justify-between overflow-hidden">
      {/* 왼쪽 */}
      <div className="flex items-center overflow-hidden min-w-0">
        <Title text={title} isTruncated={false} />
      </div>

      {/* 오른쪽 결과 수 */}
      <div className="px-2 ps-3 self-end justify-self-end flex-shrink-0 select-none">
        <SubButton
          text={subButtonText}
          onClick={() => {
            router.push(navigateTo);
          }}
        />
      </div>
    </div>
  );
};

interface TextProps {
  text: string;
  isTruncated: boolean;
}

const Title = ({ text, isTruncated }: TextProps) => {
  return (
    <h1
      className={clsx(
        "text-lg font-bold text-gray-800",
        isTruncated && "truncate"
      )}
    >
      {text}
    </h1>
  );
};

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const SubButton = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "font-medium text-muted-foreground hover:text-gray-900 transition-colors",
        "flex items-center gap-1"
      )}
    >
      {text}
      <ChevronRight className="h-4 w-4" />
    </button>
  );
};
