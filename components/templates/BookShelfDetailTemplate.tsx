"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe, Lock, Settings, Trash2 } from "lucide-react";
import {
  ShelfUpdateDialog,
  ShelfUpdateOptions,
} from "@/components/organisms/popup/ShelfUpdateDialog";
import { BookPreview } from "@/types/BookPreview";
import { CommonShelf } from "@/types/Bookshelf";
import { ShelfBookListTemplate } from "@/components/templates/ShelfBooksTemplate";
import {
  PageHeader,
  PageHeaderGroup,
  PageHeaderSubLabel,
  PageHeaderTitle,
} from "../ui/custom-page-title";
import { CommonIconButton } from "../atoms/button/icon/CommonIconButton";
import { ShelfDeleteDialog } from "../organisms/popup/ShelfDeleteDialog";

interface Props {
  initShelf: CommonShelf;
  initBooks: BookPreview[];
  redirectUri?: string;
}

export const BookshelfDetailTemplate = ({
  initShelf,
  initBooks,
  redirectUri = "/bookshelves",
}: Props) => {
  const router = useRouter();

  const [shelf, setShelf] = useState<CommonShelf>(initShelf);
  const [books, setBooks] = useState<BookPreview[]>(initBooks);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleUpdateShelf = (updatedShelf: ShelfUpdateOptions) => {
    if (!shelf) return;

    setShelf({
      ...shelf,
      name: updatedShelf.name.trim(),
      isPublic: updatedShelf.isPublic,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-2">
        <div className="shrink-0">
          <CommonIconButton
            icon={<ArrowLeft />}
            onClick={() => router.push(redirectUri)}
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <CommonIconButton
            onClick={() => {}}
            icon={
              shelf.isPublic ? (
                <Globe className="w-5 h-5 text-primary" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )
            }
          />
          {OwnerButtonGroups()}
        </div>
      </div>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderTitle>{shelf.name}</PageHeaderTitle>
          <PageHeaderSubLabel>
            {books.length} / 50권의 책 저장 중
          </PageHeaderSubLabel>
        </PageHeaderGroup>
      </PageHeader>

      <ShelfBookListTemplate
        shelfId={shelf.id}
        searchResults={books}
        removeBook={(bookId) => setBooks(books.filter((b) => b.id !== bookId))}
      />
    </div>
  );

  function OwnerButtonGroups() {
    return (
      <>
        <CommonIconButton
          icon={<Trash2 />}
          onClick={() => setDialogType("delete")}
        />

        <ShelfDeleteDialog
          isOpen={dialogType === "delete"}
          shelf={{
            id: shelf.id,
            name: shelf.name,
            isPublic: shelf.isPublic,
          }}
          onClose={() => setDialogType(null)}
          onDelete={() => router.back()}
        />
        <CommonIconButton
          icon={<Settings />}
          onClick={() => setDialogType("edit")}
        />

        <ShelfUpdateDialog
          bookshelf={{
            id: shelf.id,
            name: shelf.name,
            isPublic: shelf.isPublic,
          }}
          isOpen={dialogType === "edit"}
          onClose={() => setDialogType(null)}
          onUpdate={handleUpdateShelf}
        />
      </>
    );
  }
};
