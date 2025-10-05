"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Book } from "lucide-react";
import { GrayBadge, GreenBadge } from "@/components/atoms/badge/TextLabelBadge";
import { DeletablaBookInfo } from "@/components/organisms/book/preview/DeletableBookInfo";
import {
  ShelfUpdateDialog,
  ShelfUpdateOptions,
} from "@/components/organisms/popup/ShelfUpdateDialog";
import { fetchBookshelfDetail } from "@/utils/api/BookshelfApi";
import { BookPreview } from "@/types/BookPreview";
import { CommonShelf, MAX_SHELF_BOOK_COUNT } from "@/types/Bookshelf";
import { findBooksPreview } from "@/utils/api/BookPreviewApi";
import { FIRST_PAGE } from "@/types/Pageable";

export default function BookshelfDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [shelf, setShelf] = useState<CommonShelf | null>(null);
  const [books, setBooks] = useState<BookPreview[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!params.id) {
      setShelf(null);
      return;
    }

    // 책장 정보를 불러옴
    fetchBookshelfDetail({
      shelfId: params.id.toString(),
      side: "client",
    }).then((data) => {
      setShelf(data);
      if (data.books.length === 0) return;

      // 책장의 책정보를 불러옴
      findBooksPreview(
        { bookIds: data.books.map((book) => book.id), categoryCond: null },
        { pageNumber: FIRST_PAGE, pageSize: MAX_SHELF_BOOK_COUNT },
        "client"
      ).then((response) => {
        setBooks(response.books);
      });
    });
  }, [params.id]);

  const removeBookFromShelf = (bookId: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  const handleUpdateShelf = (updatedShelf: ShelfUpdateOptions) => {
    if (!shelf) return;

    setShelf({
      ...shelf,
      name: updatedShelf.name.trim(),
      isPublic: updatedShelf.isPublic,
      createdAt: new Date().toISOString(),
    });
  };

  if (!shelf) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            책장을 찾을 수 없습니다
          </h2>
          <Button onClick={() => router.back()}>돌아가기</Button>
        </div>
      </div>
    );
  }

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

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {books.map((book) => (
              <DeletablaBookInfo
                key={book.id}
                book={book}
                deleteBook={() => removeBookFromShelf(book.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-8">
            <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">책장이 비어있습니다</h3>
          </div>
        )}

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
}
