import { useState } from "react";
import { LibraryMap } from "../organisms/LibraryMap";
import { MapBound } from "@/types/MapBound";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { BookPreview } from "@/types/BookPreview";

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

      <LibraryMap
        booksInfo={booksInfo}
        mapBound={mapBound}
        libraryMarkerInfos={libraries}
        onBoundsChange={onBoundsChange}
        onError={() => setScriptLoadError(true)}
      />
    </div>
  );
};
