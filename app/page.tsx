"use client";

import BookSearch from "@/components/templates/BookSearchPreviewTemplate";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BookSearch />
        </div>
      </div>
    </main>
  );
}
