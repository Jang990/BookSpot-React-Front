"use client";

import { useState } from "react";
import LibraryInfo from "@/components/organisms/LibraryInfo";
import { useSearchParams } from "next/navigation";
import {
  BookStockStatus,
  NearbyLibraryStock,
} from "@/types/NearbyLibraryStock";

export default function LibraryPage() {
  const [libraryStocks, setLibraryStocks] = useState<NearbyLibraryStock[]>([]);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {libraryStocks.map((library) => (
          <LibraryInfo
            key={library.library.libraryName}
            libraryStock={library}
          />
        ))}
      </div>
    </div>
  );
}

function sortBookStocks(
  bookStocks: BookStockStatus[],
  bookIds: string[]
): BookStockStatus[] {
  const bookIdOrder = new Map(bookIds.map((id, index) => [id, index]));

  return bookStocks.sort((a, b) => {
    return (
      (bookIdOrder.get(a.id) ?? Infinity) - (bookIdOrder.get(b.id) ?? Infinity)
    );
  });
}
