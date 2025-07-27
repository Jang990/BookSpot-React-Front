"use client";

import { Button } from "@/components/ui/button";
import {
  parseSearchTermInClient,
  SEARCH_TERM_KEY,
} from "@/utils/querystring/SearchTerm";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectLibraryButtonProps {
  libraryId: string;
}

export const SelectLibraryButton = ({
  libraryId,
}: SelectLibraryButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = parseSearchTermInClient(searchParams);

  return (
    <div className="py-1">
      <Button
        onClick={() => {
          router.push(
            `/libraries/${libraryId}/books?${SEARCH_TERM_KEY}=${searchTerm}`
          );
        }}
        className="w-full"
      >
        도서관 선택
      </Button>
    </div>
  );
};
