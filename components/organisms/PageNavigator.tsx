"use client";

import { NumberPageNavigator } from "@/components/molecules/pagination/NumberPageNavigator";

interface PageNaviProps {
  totalPages: number;
}

export const MAX_PAGINATED_PAGES = 50;
export const PageNavigator = ({ totalPages }: PageNaviProps) => {
  return (
    <>
      <NumberPageNavigator totalPages={totalPages} />
    </>
  );
};
