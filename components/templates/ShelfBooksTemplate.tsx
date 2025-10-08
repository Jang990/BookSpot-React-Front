"use client";
import { BookPreview } from "@/types/BookPreview";
import { SearchableBookInfo } from "../organisms/book/preview/SearchableBookInfo";
import { useState } from "react";
import { ShelfSelectListDialog } from "../organisms/popup/ShelfSelectListDialog";
import { ShelfCreateDialog } from "../organisms/popup/ShelfCreateDialog";
import { Book } from "lucide-react";

interface BookPreviewListProps {
  searchResults: BookPreview[];
  removeBook: (bookId: string) => void;
}

export const ShelfBookListTemplate = ({
  searchResults,
  removeBook,
}: BookPreviewListProps) => {
  const [shelfDialogType, setShelfDialogType] = useState<
    "select" | "create" | null
  >(null);
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const openShelfListDialog = (bookId: string) => {
    setSelectedBookId(bookId);
    setShelfDialogType("select");
  };

  const closeShelfListDialog = () => {
    setSelectedBookId("");
    setShelfDialogType(null);
  };

  const openShelfCreateDialog = () => {
    setSelectedBookId("");
    setShelfDialogType("create");
  };

  return (
    <div>
      {searchResults.length === 0 && <EmptyShelfResult />}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {searchResults.length !== 0 && (
          <>
            {searchResults.map((book) => (
              <SearchableBookInfo
                key={book.id}
                book={book}
                onClickAddBtn={(book) => openShelfListDialog(book.id)}
              ></SearchableBookInfo>
            ))}
          </>
        )}
      </div>
      <ShelfSelectListDialog
        isOpen={shelfDialogType === "select"}
        bookId={selectedBookId}
        onClose={closeShelfListDialog}
        onComplete={() => {}}
        onClickNewShelf={openShelfCreateDialog}
      />

      <ShelfCreateDialog
        isOpen={shelfDialogType === "create"}
        onClose={closeShelfListDialog}
      />
    </div>
  );
};

const EmptyShelfResult = () => {
  return (
    <div className="text-center py-12 mb-8">
      <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">책장이 비어있습니다</h3>
    </div>
  );
};
