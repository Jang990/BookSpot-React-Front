import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { BookOpen } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface Props {
  libraryMarkerInfo: LibraryMarkerInfo;
  isHovered: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

export const LibraryMarker = ({
  libraryMarkerInfo,
  isHovered,
  onMouseOver,
  onMouseOut,
}: Props) => {
  const { library, stock } = libraryMarkerInfo;

  return (
    <CustomOverlayMap
      position={{
        lat: library.location.latitude,
        lng: library.location.longitude,
      }}
      yAnchor={1}
      xAnchor={0.5}
      zIndex={isHovered ? 100 : 0}
    >
      <div
        className={`
          flex flex-col items-center transition-all duration-300
          ${isHovered ? "scale-110" : ""}
        `}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {/* 마커 아이콘 */}
        <div
          className={`
          w-10 h-10 rounded-full flex items-center justify-center shadow-md
          ${isHovered ? "bg-primary text-white" : "bg-white text-primary"}
        `}
        >
          <BookOpen size={20} />
        </div>

        {/* 도서관 이름 */}
        <div
          className={`
            mt-1 py-1 px-2.5 rounded-md shadow-md text-center whitespace-nowrap
            transition-all duration-300
            ${
              isHovered
                ? "bg-primary text-white font-semibold"
                : "bg-white/90 text-primary text-xs"
            }
          `}
        >
          {library.name}
        </div>
      </div>
    </CustomOverlayMap>
  );
};
