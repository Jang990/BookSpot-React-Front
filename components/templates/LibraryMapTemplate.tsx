import { useState } from "react";
import {
  LibraryMap,
  MapLocationProps as MapLocationProps,
} from "../organisms/LibraryMap";
import { MapBound } from "@/types/MapBound";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { BookPreview } from "@/types/BookPreview";

export interface Props {
  booksInfo: BookPreview[];
  mapLocationProps: MapLocationProps;
  libraries: LibraryMarkerInfo[];
  onBoundsChange: (level: number, bound: MapBound) => void;
}

export const LibraryMapTemplate = ({
  booksInfo = [],
  mapLocationProps,
  libraries,
  onBoundsChange,
}: Props) => {
  const [scriptLoadError, setScriptLoadError] = useState<boolean>(false);

  return (
    <div className="relative w-full flex items-center justify-center">
      {scriptLoadError && <div>잘못된 스크립트 오류입니다.</div>}

      <LibraryMap
        booksInfo={booksInfo}
        mapLocationProps={mapLocationProps}
        libraryMarkerInfos={libraries}
        onBoundsChange={onBoundsChange}
        onError={() => setScriptLoadError(true)}
      />
    </div>
  );
};
