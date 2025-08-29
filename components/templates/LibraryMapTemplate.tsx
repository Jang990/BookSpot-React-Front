import { useState } from "react";
import { MapBound } from "@/types/MapBound";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { BookPreview } from "@/types/BookPreview";
import { LibraryStockMap } from "../organisms/map/TEMP_LibraryMap";

export interface Props {
  booksInfo: BookPreview[];
  mapBound: MapBound;
  libraries: LibraryMarkerInfo[];
  onBoundsChange: (bound: MapBound) => void;
}

export const LibraryMapTemplate = ({
  booksInfo = [],
  mapBound,
  libraries,
  onBoundsChange,
}: Props) => {
  const [scriptLoadError, setScriptLoadError] = useState<boolean>(false);

  return (
    <div className="relative w-full flex items-center justify-center">
      {scriptLoadError && <div>잘못된 스크립트 오류입니다.</div>}

      <LibraryStockMap
        booksInfo={booksInfo}
        mapBound={mapBound}
        libraryMarkerInfos={libraries}
        onBoundsChange={onBoundsChange}
        onError={() => setScriptLoadError(true)}
      />
    </div>
  );
};
