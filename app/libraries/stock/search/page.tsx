"use client";

import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { debounce } from "@/utils/debounce";
import { use, useEffect, useState } from "react";
import { LibraryMapTemplate } from "@/components/templates/LibraryMapTemplate";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { fetchLibraryStock } from "@/utils/api/LibraryStockApi";
import { BookPreview } from "@/types/BookPreview";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";

import {
  findMapLocationProps,
  setMapLocationProps,
} from "@/utils/MapLocalStorage";
import { OUT_OF_ZOOM_STOCK } from "@/types/LibraryStock";
import { MapDetailLimitInfo } from "@/components/organisms/MapLimitInfo";

export default function Libraries({
  searchParams,
}: {
  searchParams: Promise<{ bookIds?: string }>;
}) {
  const [libraries, setLibraries] = useState<LibraryMarkerInfo[]>([]);
  const [booksInfo, setBooksInfo] = useState<BookPreview[]>([]);

  const bookIdsStr = use(searchParams).bookIds;
  const bookIds = bookIdsStr ? bookIdsStr.split(",") : [];
  const MAP_SEARCH_DELAY = 275;
  const CULSTERD_LEVEL = 8;
  const MAX_CART_SIZE = 20;

  const mapBound: MapBound = findMapLocationProps();

  useEffect(() => {
    if (!bookIds || bookIds.length === 0) return;

    fetchBooksPreview({
      bookIds: bookIds,
      pageable: { pageNumber: 0, pageSize: MAX_CART_SIZE },
    }).then((response) => {
      const books: BookPreview[] = response.content.map(convertBookPreview);
      setBooksInfo(books);
    });

    debouncedMapSearch(mapBound);
  }, []);

  const debouncedMapSearch = debounce((bound: MapBound) => {
    setMapLocationProps(bound);

    fetchNearByLibraryStock({
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

        fetchLibraryStock({ libraryIds: libraryIds, bookIds: bookIds }).then(
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

      <MapDetailLimitInfo detailLevel={CULSTERD_LEVEL}></MapDetailLimitInfo>
    </div>
  );
}
