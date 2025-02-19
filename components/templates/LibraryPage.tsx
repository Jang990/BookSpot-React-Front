"use client";

import { useState, useEffect } from "react";
import LibraryInfo from "@/components/organisms/LibraryInfo";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { useSearchParams } from "next/navigation";
import {
  BookStockStatus,
  NearbyLibraryStock,
} from "@/types/NearbyLibraryStock";

export default function LibraryPage() {
  const [libraryStocks, setLibraryStocks] = useState<NearbyLibraryStock[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookIdsStr = searchParams.get("bookIds");
    const bookIds = bookIdsStr ? bookIdsStr.split(",") : [];
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    fetchNearByLibraryStock({
      bookIds: bookIds,
      location: {
        latitude: lat,
        longitude: lng,
      },
    }).then((libraryStocks) => {
      libraryStocks.forEach((libraryStock) => {
        libraryStock.bookStocks = sortBookStocks(
          libraryStock.bookStocks,
          bookIds
        );
      });
      console.log(libraryStocks);
      setLibraryStocks(libraryStocks);
    });
  }, []);

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
      (bookIdOrder.get(a.bookId) ?? Infinity) -
      (bookIdOrder.get(b.bookId) ?? Infinity)
    );
  });
}
