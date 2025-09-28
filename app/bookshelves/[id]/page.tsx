"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mockBookshelves, mockBooks } from "@/lib/mock-data";
import { ArrowLeft, Settings, Book } from "lucide-react";
import { GrayBadge, GreenBadge } from "@/components/atoms/badge/TextLabelBadge";
import { BookPreview } from "@/types/BookPreview";
import { DeletablaBookInfo } from "@/components/organisms/book/preview/DeletableBookInfo";
import { Bookshelf } from "@/types/Bookshelf";
import { BookshelfSettingsDialog } from "@/components/organisms/popup/BookShelfSettingsDialog";

export default function BookshelfDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const shelf = mockBookshelves.find((s) => s.id === params.id);
    if (shelf) {
      setBookshelf(shelf);
    }
  }, [params.id]);

  const addBookToShelf = (book: BookPreview) => {
    if (!bookshelf) return;

    if (bookshelf.books.length >= 50) {
      alert("책장에는 최대 50권까지만 저장할 수 있습니다.");
      return;
    }

    if (bookshelf.books.some((b) => b.id === book.id)) {
      alert("이미 책장에 있는 책입니다.");
      return;
    }

    const updatedBookshelf = {
      ...bookshelf,
      books: [...bookshelf.books, book],
    };
    setBookshelf(updatedBookshelf);
  };

  const removeBookFromShelf = (bookId: string) => {
    if (!bookshelf) return;

    const updatedBookshelf = {
      ...bookshelf,
      books: bookshelf.books.filter((book) => book.id !== bookId),
    };
    setBookshelf(updatedBookshelf);
  };

  const handleUpdateBookshelf = (updatedBookshelf: Bookshelf) => {
    setBookshelf(updatedBookshelf);
    // In a real app, this would also update the backend
  };

  const handleDeleteBookshelf = () => {
    // In a real app, this would delete from backend
    router.push("/bookshelves");
  };

  if (!bookshelf) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            책장을 찾을 수 없습니다
          </h2>
          <Button onClick={() => router.push("/bookshelves")}>
            책장 목록으로 돌아가기
          </Button>
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
              onClick={() => router.push("/bookshelves")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              책장 목록
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {bookshelf.name}
                </h1>
                <div className="flex items-center gap-2">
                  {bookshelf.isPublic ? (
                    <GreenBadge text="공개" />
                  ) : (
                    <GrayBadge text="비공개" />
                  )}
                </div>
              </div>
              <p className="text-muted-foreground">
                {bookshelf.books.length}/50권의 책이 저장되어 있습니다
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
        {bookshelf.books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {bookshelf.books.map((book) => (
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

        <BookshelfSettingsDialog
          bookshelf={bookshelf}
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onUpdate={handleUpdateBookshelf}
          onDelete={handleDeleteBookshelf}
        />
      </div>
    </div>
  );
}
