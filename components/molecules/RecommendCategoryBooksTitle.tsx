"use client";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { onClickCategory } from "@/components/templates/BookCategoryPageTemplate";
import { LEVEL_LEAF } from "@/utils/querystring/CategoryId";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from "@/components/ui/custom-page-title";
import { Button } from "@/components/ui/button";

interface Props {
  subButtonText?: string;
  categoryId: number;
}

export const RecommendCategoryBooksTitle = ({ categoryId }: Props) => {
  const router = useRouter();

  return (
    <div>
      <PageHeader>
        <PageHeaderTitle>이런 책 어때요?</PageHeaderTitle>
        <PageHeaderActions>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => {
              onClickCategory(
                router,
                new ReadonlyURLSearchParams(),
                categoryId,
                LEVEL_LEAF,
                () => {}
              );
            }}
          >
            더보기
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PageHeaderActions>
      </PageHeader>
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
