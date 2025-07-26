"use client";

import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { fetchNearByLibraries } from "@/utils/api/LibraryApi";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";

import {
  DEFAULT_MAP_BOUND,
  findMapLocationProps,
  setMapLocationProps,
} from "@/utils/MapLocalStorage";
import { LibrarySelectionMapTemplate } from "@/components/templates/LibrarySelectionMapTemplate";

export default function LibrariesSelection() {
  const [libraries, setLibraries] = useState<LibraryMarkerInfo[]>([]);
  const [initMapBound, setInitMapBound] = useState<MapBound>(DEFAULT_MAP_BOUND);

  const MAP_SEARCH_DELAY = 275;

  useEffect(() => {
    const mapBound = findMapLocationProps();
    setInitMapBound(mapBound);
    findLibraries(mapBound);
  }, []);

  const debouncedMapSearch = debounce((bound: MapBound) => {
    setMapLocationProps(bound);
    findLibraries(bound);
  }, MAP_SEARCH_DELAY);

  function findLibraries(bound: MapBound) {
    fetchNearByLibraries({
      mapBound: bound,
    }).then((responseLibraries) => {
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
    });
  }

  return (
    <div className="py-2 px-2 sm:py-4 sm:px-4">
      {/* <LibraryPage /> */}
      <div className="w-full">
        <LibrarySelectionMapTemplate
          mapBound={initMapBound}
          libraries={libraries}
          onBoundsChange={debouncedMapSearch}
        />
      </div>
    </div>
  );
}
