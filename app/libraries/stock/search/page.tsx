"use client";

import { LibraryMap } from "@/components/organisms/LibraryMap";
import LibraryPage from "@/components/templates/LibraryPage";
import { MapBound } from "@/types/MapBound";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { debounce } from "@/utils/debounce";
import { useSearchParams } from "next/navigation";

export default function Libraries() {
  const searchParams = useSearchParams();
  const bookIdsStr = searchParams.get("bookIds");
  const bookIds = bookIdsStr ? bookIdsStr.split(",") : [];
  const MAP_SEARCH_DELAY = 275;

  const debouncedMapSearch = debounce((bound: MapBound) => {
    fetchNearByLibraryStock({
      bookIds: bookIds,
      mapBound: bound,
    }).then((content) => console.log(content));
  }, MAP_SEARCH_DELAY);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* <LibraryPage /> */}
      <LibraryMap
        onBoundsChange={(bound: MapBound) => debouncedMapSearch(bound)}
      />
    </main>
  );
}
