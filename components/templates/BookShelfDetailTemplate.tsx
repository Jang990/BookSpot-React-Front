"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Lock, Settings } from "lucide-react";
import {
  ShelfUpdateDialog,
  ShelfUpdateOptions,
} from "@/components/organisms/popup/ShelfUpdateDialog";
import { BookPreview } from "@/types/BookPreview";
import { CommonShelf } from "@/types/Bookshelf";
import { ShelfBookListTemplate } from "@/components/templates/ShelfBooksTemplate";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderGroup,
  PageHeaderSubLabel,
  PageHeaderTitle,
} from "../ui/custom-page-title";
import { CommonIconButton } from "../atoms/button/icon/CommonIconButton";

interface Props {
  initShelf: CommonShelf;
  initBooks: BookPreview[];
}

export const BookshelfDetailTemplate = ({ initShelf, initBooks }: Props) => {
  const router = useRouter();

  const [shelf, setShelf] = useState<CommonShelf>(initShelf);
  const [books, setBooks] = useState<BookPreview[]>(initBooks);
  const [showSettings, setShowSettings] = useState(false);

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
      {/* Header */}
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderTitle onBackClick={() => router.back()}>
            {shelf.isPublic ? (
              <Globe className="inline-block align-middle mr-2 text-primary h-5 w-5" />
            ) : (
              <Lock className="inline-block align-middle text-muted-foreground mr-2 h-5 w-5" />
            )}
            {shelf.name}
          </PageHeaderTitle>
          <PageHeaderSubLabel>
            {books.length} / 50권의 책 저장 중
          </PageHeaderSubLabel>
        </PageHeaderGroup>

        <PageHeaderActions>
          <CommonIconButton
            icon={<Settings />}
            onClick={() => setShowSettings(true)}
          />
        </PageHeaderActions>
      </PageHeader>
      {/* 
        <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {shelf.name}
                </h1>
                <div className="flex items-center gap-2">
                  {shelf.isPublic ? (
                    <GreenBadge text="공개" />
                  ) : (
                    <GrayBadge text="비공개" />
                  )}
                </div>
              </div>
               */}

      <ShelfBookListTemplate searchResults={books} />

      <ShelfUpdateDialog
        bookshelf={{
          id: shelf.id,
          name: shelf.name,
          isPublic: shelf.isPublic,
        }}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onUpdate={handleUpdateShelf}
      />
    </div>
  );
};
