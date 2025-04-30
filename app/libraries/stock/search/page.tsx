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
import { MapLocationProps } from "@/components/organisms/LibraryMap";
import {
  findMapLocationProps,
  setMapLocationProps,
} from "@/utils/MapLocalStorage";

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
  const CULSTERD_LEVEL = 7;
  const MAX_CART_SIZE = 20;

  useEffect(() => {
    if (!cart || cart.length === 0) return;

    fetchBooksPreview({
      bookIds: cart,
      pageable: { pageNumber: 0, pageSize: MAX_CART_SIZE },
    }).then((response) => {
      const books: BookPreview[] = response.content.map(convertBookPreview);
      setBooksInfo(books);
    });
  }, [cart]);

  const debouncedMapSearch = debounce((level: number, bound: MapBound) => {
    const centerLatitude = (bound.nw.latitude + bound.se.latitude) / 2;
    const centerLongitude = (bound.nw.longitude + bound.se.longitude) / 2;
    setMapLocationProps({
      clusterdLevel: level,
      location: { latitude: centerLatitude, longitude: centerLongitude },
    });

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
        if (responseLibraries.length === 0 || level >= CULSTERD_LEVEL) return;

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

  const mapLocationProps: MapLocationProps = findMapLocationProps();

  return (
    <div className="py-2 px-2 sm:py-4 sm:px-4">
      {/* <LibraryPage /> */}
      <div className="w-full">
        <LibraryMapTemplate
          booksInfo={booksInfo}
          mapLocationProps={mapLocationProps}
          libraries={libraries}
          onBoundsChange={debouncedMapSearch}
        />
      </div>
    </div>
  );
}
