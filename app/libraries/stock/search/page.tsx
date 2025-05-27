"use client";

import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { debounce } from "@/utils/debounce";
import { use, useEffect, useState } from "react";
import { LibraryMapTemplate } from "@/components/templates/LibraryMapTemplate";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { fetchLibraryStock } from "@/utils/api/LibraryStockApi";
import { useBookCart } from "@/contexts/BookCartContext";
import { BookPreview } from "@/types/BookPreview";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";

import {
  findMapLocationProps,
  setMapLocationProps,
} from "@/utils/MapLocalStorage";
import { OUT_OF_ZOOM_STOCK } from "@/types/LibraryStock";
import { Info } from "lucide-react";

const DISTANCE_METER = [20, 30, 50, 100, 250, 500, 1000, 2000, 4000, 8000];
function formatDistance(meter: number): string {
  if (meter >= 1000) {
    return meter / 1000 + " km";
  }
  return meter + " m";
}

export default function Libraries({
  searchParams,
}: {
  searchParams: Promise<{ bookIds?: string }>;
}) {
  const { cart } = useBookCart();
  const [libraries, setLibraries] = useState<LibraryMarkerInfo[]>([]);
  const [booksInfo, setBooksInfo] = useState<BookPreview[]>([]);

  const bookIdsStr = use(searchParams).bookIds;
  const bookIds = bookIdsStr ? bookIdsStr.split(",") : [];
  const MAP_SEARCH_DELAY = 275;
  const CULSTERD_LEVEL = 8;
  const MAX_CART_SIZE = 20;

  const mapBound: MapBound = findMapLocationProps();

  useEffect(() => {
    if (!cart || cart.length === 0) return;

    fetchBooksPreview({
      bookIds: cart,
      pageable: { pageNumber: 0, pageSize: MAX_CART_SIZE },
    }).then((response) => {
      const books: BookPreview[] = response.content.map(convertBookPreview);
      setBooksInfo(books);
    });

    debouncedMapSearch(mapBound);
  }, [cart]);

  const debouncedMapSearch = debounce((bound: MapBound) => {
    setMapLocationProps(bound);

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
        const libraryIds = responseLibraries.map((library) => library.id);
        const libraryMap = new Map(
          responseLibraries.map((library) => [library.id, library])
        );

        if (
          responseLibraries.length === 0 ||
          bound.clusterdLevel >= CULSTERD_LEVEL
        ) {
          setLibraries(
            responseLibraries.map((library) => ({
              library,
              stock: OUT_OF_ZOOM_STOCK,
            }))
          );
          return;
        }

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
    <div className="py-2 px-2 sm:py-4 sm:px-4">
      {/* <LibraryPage /> */}
      <div className="w-full">
        <LibraryMapTemplate
          booksInfo={booksInfo}
          mapBound={mapBound}
          libraries={libraries}
          onBoundsChange={debouncedMapSearch}
        />
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <Info size={16} className="flex-shrink-0" />
          <span className="text-center">
            지도의 왼쪽 아래에 표시되는 거리 표시가{" "}
            {formatDistance(DISTANCE_METER[CULSTERD_LEVEL - 2])} 이하일 때 소장
            도서 정보가 표시됩니다.
          </span>
        </div>
      </div>
    </div>
  );
}
