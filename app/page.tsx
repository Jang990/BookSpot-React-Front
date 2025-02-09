"use client";

import { useState, useEffect } from "react";
import type { Book } from "@/types/Book";
import BookSearch from "@/components/BookSearch";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const handleBookSelect = (book: Book) => {
    setSelectedBooks((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book]
    );
  };

  const handleFindLibraries = () => {
    // Save selected books to session storage
    sessionStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));
    router.push("/");
  };

  useEffect(() => {
    // Restore selected books from session storage on page load
    const storedBooks = sessionStorage.getItem("selectedBooks");
    if (storedBooks) {
      setSelectedBooks(JSON.parse(storedBooks));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary mb-12">
            상세 검색
          </h1>

          <BookSearch
            //   onBookSelect={handleBookSelect}
            //   selectedBooks={selectedBooks}
            page={page}
            setHasMore={setHasMore}
            lastBookElementRef={(node) => {
              if (node) {
                // Implement intersection observer logic here
              }
            }}
          />

          {selectedBooks.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                onClick={handleFindLibraries}
              >
                선택한 책으로 도서관 찾기 ({selectedBooks.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
