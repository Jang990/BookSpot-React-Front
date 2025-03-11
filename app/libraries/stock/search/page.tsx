"use client";

import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { debounce } from "@/utils/debounce";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LibraryMapTemplate } from "@/components/templates/LibraryMapTemplate";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { fetchLibraryStock } from "@/utils/api/LibraryStockApi";
import { useBookCart } from "@/contexts/BookCartContext";

export default function Libraries() {
  const { cart } = useBookCart();
  const [libraries, setLibraries] = useState<LibraryMarkerInfo[]>([]);

  const searchParams = useSearchParams();
  const bookIdsStr = searchParams.get("bookIds");
  const bookIds = bookIdsStr ? bookIdsStr.split(",") : [];
  const MAP_SEARCH_DELAY = 275;
  const CULSTERD_LEVEL = 7;

  const debouncedMapSearch = debounce((level: number, bound: MapBound) => {
    fetchNearByLibraryStock({
      bookIds: bookIds,
      mapBound: bound,
    })
      .then((responseLibraries) => {
        const emptyStockLibraries: LibraryMarkerInfo[] = responseLibraries.map(
          (library) => toEmptyStockLibrary(library)
        );

        setLibraries(emptyStockLibraries);
        return responseLibraries;

        function toEmptyStockLibrary(library: Library): LibraryMarkerInfo {
          return {
            library,
          } as LibraryMarkerInfo;
        }
      })
      .then((responseLibraries) => {
        if (level >= CULSTERD_LEVEL) return;

        const libraryIds = responseLibraries.map((library) => library.id);
        const libraryMap = new Map(
          responseLibraries.map((library) => [library.id, library])
        );

        fetchLibraryStock({ libraryIds: libraryIds, bookIds: cart }).then(
          (libraryStocks) => {
            setLibraries(
              libraryStocks.map((libStock) => {
                return {
                  library: libraryMap.get(libStock.libraryId),
                  stock: libStock,
                } as LibraryMarkerInfo;
              })
            );
          }
        );
      });
  }, MAP_SEARCH_DELAY);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* <LibraryPage /> */}
      <LibraryMapTemplate
        clusterdLevel={CULSTERD_LEVEL}
        libraries={libraries}
        onBoundsChange={debouncedMapSearch}
      />
    </main>
  );
}
