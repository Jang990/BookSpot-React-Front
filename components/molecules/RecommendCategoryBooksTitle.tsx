"use client";
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
