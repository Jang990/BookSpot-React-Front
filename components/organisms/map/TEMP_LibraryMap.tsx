import { LibraryStockMarker } from "@/components/molecules/LibararyStockMarker";
import { LibraryStockPanel } from "@/components/molecules/LibraryStockPanel";
import { BookPreview } from "@/types/BookPreview";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { MapBound } from "@/types/MapBound";
import { BaseLibraryMap } from "./TEMP_BaseLibraryMap";
import { LibraryMarker } from "@/components/molecules/LibararyMarker";
import { LibrarySelectionPanel } from "@/components/molecules/LibrarySelectionPanel";

interface StockMapProps {
  booksInfo: BookPreview[];
  mapBound: MapBound;
  libraryMarkerInfos: LibraryMarkerInfo[];
  onBoundsChange: (bound: MapBound) => void;
  onError?: () => void;
}

export const LibraryStockMap = ({
  booksInfo,
  mapBound,
  libraryMarkerInfos,
  onBoundsChange,
  onError,
}: StockMapProps) => {
  return (
    <BaseLibraryMap
      mapBound={mapBound}
      libraryMarkerInfos={libraryMarkerInfos}
      onBoundsChange={onBoundsChange}
      onError={onError}
      renderMarker={({ libraryMarkerInfo, ...props }) => (
        <LibraryStockMarker
          key={libraryMarkerInfo.library.id}
          libraryMarkerInfo={libraryMarkerInfo}
          {...props}
        />
      )}
      renderPanel={({
        selectedLibraryInfo,
        isEntering,
        onClose,
        onMoveToLocation,
      }) => (
        <LibraryStockPanel
          libraryMarkerInfo={selectedLibraryInfo}
          books={booksInfo}
          isEntering={isEntering}
          onClose={onClose}
          onMoveToLocation={onMoveToLocation}
        />
      )}
    />
  );
};

interface SelectionMapProps {
  mapBound: MapBound;
  libraryMarkerInfos: LibraryMarkerInfo[];
  onBoundsChange: (bound: MapBound) => void;
  onError?: () => void;
}

export const LibrarySelectionMap = ({
  mapBound,
  libraryMarkerInfos,
  onBoundsChange,
  onError,
}: SelectionMapProps) => {
  return (
    <BaseLibraryMap
      mapBound={mapBound}
      libraryMarkerInfos={libraryMarkerInfos}
      onBoundsChange={onBoundsChange}
      onError={onError}
      renderMarker={({ libraryMarkerInfo, ...props }) => (
        <LibraryMarker
          key={libraryMarkerInfo.library.id}
          library={libraryMarkerInfo.library}
          {...props}
        />
      )}
      renderPanel={({
        selectedLibraryInfo,
        isEntering,
        onClose,
        onMoveToLocation,
      }) => (
        <LibrarySelectionPanel
          libraryMarkerInfo={selectedLibraryInfo}
          isEntering={isEntering}
          onClose={onClose}
          onMoveToLocation={onMoveToLocation}
        />
      )}
    />
  );
};
