"use client";

import { Button } from "@/components/ui/button";
import { LIBRARY_QUERY_STRING_KEY } from "@/utils/querystring/LibraryId";
import { deletePaginationOptions } from "@/utils/querystring/PaginationOptions.Util";
import { SEARCH_TERM_KEY } from "@/utils/querystring/SearchTerm";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectLibraryButtonProps {
  libraryId: string;
}

export const SelectLibraryButton = ({
  libraryId,
}: SelectLibraryButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = (): string => {
    const params = new URLSearchParams(searchParams as any);
    params.set(LIBRARY_QUERY_STRING_KEY, libraryId);
    // params.delete(SEARCH_TERM_KEY);
    deletePaginationOptions(params);
    return params.toString();
  };

  return (
    <div className="py-1">
      <Button
        onClick={() => {
          router.push(`/books?${queryString()}`);
        }}
        className="w-full"
      >
        도서관 선택
      </Button>
    </div>
  );
};
