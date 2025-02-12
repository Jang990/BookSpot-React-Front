"use client";

import { useEffect, useState } from "react";
import BookSearch from "@/components/templates/BookSearchPreviewTemplate";
import { BookPreview } from "@/types/BookPreview";

export default function Home() {
  const [hasMore, setHasMore] = useState(true);
  const [searchResult, setSerachResult] = useState<BookPreview[]>([]);

  useEffect(() => {
    console.log(searchResult);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BookSearch
            //   onBookSelect={handleBookSelect}
            //   selectedBooks={selectedBooks}
            setHasMore={setHasMore}
            lastBookElementRef={(node) => {
              if (node) {
                // Implement intersection observer logic here
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
