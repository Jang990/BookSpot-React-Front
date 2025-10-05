"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { GrayBadge, GreenBadge } from "@/components/atoms/badge/TextLabelBadge";
import {
  ShelfUpdateDialog,
  ShelfUpdateOptions,
} from "@/components/organisms/popup/ShelfUpdateDialog";
import { BookPreview } from "@/types/BookPreview";
import { CommonShelf } from "@/types/Bookshelf";
import { ShelfBookListTemplate } from "@/components/templates/ShelfBooksTemplate";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              책장 목록
            </Button>
            <div>
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
              <p className="text-muted-foreground">
                {books.length}/50권의 책이 저장되어 있습니다
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-4 h-4" />
            책장 설정
          </Button>
        </div>

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
    </div>
  );
};
