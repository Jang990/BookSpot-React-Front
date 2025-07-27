import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchSingleLibrary } from "@/utils/api/LibraryApi";
import { Library } from "@/types/Library";
import { LIBRARY_QUERY_STRING_KEY } from "@/utils/querystring/LibraryId";

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
      <Link href={`/?${queryString()}`}>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 animate-in fade-in-0 slide-in-from-left-2"
        >
          <span>- {library.name}</span>
          <X className="ml-1 h-3 w-3 transition-transform hover:rotate-90" />
        </Button>
      </Link>
    );
  }

  return (
    <Link href={`libraries/map/select?${bookQueryString}`}>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 hover:scale-105"
      >
        <Plus className="mr-1 h-3 w-3 transition-transform hover:rotate-90" />
        도서관 검색
      </Button>
    </Link>
  );
};
