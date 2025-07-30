import { BookCategoryPageTemplate } from "@/components/templates/BookCategoryPageTemplate";
import { Suspense } from "react";

export default function CategorySelector() {
  return (
    <>
      <Suspense fallback={<div>로딩중…</div>}>
        <BookCategoryPageTemplate />
      </Suspense>
    </>
  );
}
