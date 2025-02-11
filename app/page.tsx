"use client";

import { useState } from "react";
import BookSearch from "@/components/BookSearch";

export default function Home() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
        </div>
      </div>
    </main>
  );
}
