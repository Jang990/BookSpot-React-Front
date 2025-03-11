import { useState } from "react";
import { LibraryMap } from "../organisms/LibraryMap";
import { MapBound } from "@/types/MapBound";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";

export interface Props {
  clusterdLevel: number;
  libraries: LibraryMarkerInfo[];
  onBoundsChange: (level: number, bound: MapBound) => void;
}

export const LibraryMapTemplate = ({
  clusterdLevel,
  libraries,
  onBoundsChange,
}: Props) => {
  const [scriptLoadError, setScriptLoadError] = useState<boolean>(false);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {scriptLoadError && <div>잘못된 스크립트 오류입니다.</div>}

        <LibraryMap
          clusterdLevel={clusterdLevel}
          libraryMarkerInfos={libraries}
          onBoundsChange={onBoundsChange}
          onError={() => setScriptLoadError(true)}
        />
      </div>
    </div>
  );
};
