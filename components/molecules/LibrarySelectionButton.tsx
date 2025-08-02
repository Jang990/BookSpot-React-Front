import { Plus, X } from "lucide-react";
import { fetchSingleLibrary } from "@/utils/api/LibraryApi";
import { Library } from "@/types/Library";
import { LIBRARY_QUERY_STRING_KEY } from "@/utils/querystring/LibraryId";
import { BookSearchFilterButton } from "./button/filter/BookSearchFilterButton";

interface LibrarySelectionButtonProps {
  bookQueryString?: string;
  libraryId: number | null;
}

export const LibrarySelectionButton = async ({
  bookQueryString,
  libraryId,
}: LibrarySelectionButtonProps) => {
  if (libraryId) {
    const library: Library = await fetchSingleLibrary({
      libraryId: libraryId.toString(),
    });
    const queryString = (): string => {
      const params = new URLSearchParams(bookQueryString);
      params.delete(LIBRARY_QUERY_STRING_KEY);
      return params.toString();
    };

    return (
      <BookSearchFilterButton
        text={library.name}
        buttonClassName="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105"
        Icon={X}
        href={`/?${queryString()}`}
      />
    );
  }

  return (
    <BookSearchFilterButton
      text="도서관 검색"
      buttonClassName="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105"
      Icon={Plus}
      href={`libraries/map/select?${bookQueryString}`}
    />
  );
};
