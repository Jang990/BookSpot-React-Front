"use client";

import { useState, useEffect } from "react";
import type { Book } from "@/types/Book";
import LibraryInfo from "@/components/Card/LibraryInfo";
import { libraries } from "@/data/libraries";
import { books } from "@/data/books";

export default function LibraryPage() {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the selected books from some state management solution or API
    // For this example, we'll just use the first three books
    setSelectedBooks(books.slice(0, 3));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {libraries.map((library) => (
          <LibraryInfo
            key={library.id}
            library={library}
            selectedBooks={selectedBooks}
          />
        ))}
      </div>
    </div>
  );
}
