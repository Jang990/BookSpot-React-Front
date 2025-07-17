import { Library } from "@/types/Library";
import { BookOpen } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface LibraryMarkerProps {
  library: Library;
  isHovered: boolean;
  isSelected: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
}

export const LibraryMarker = ({
  library,
  isHovered,
  isSelected,
  onMouseOver,
  onMouseOut,
  onClick,
}: LibraryMarkerProps) => {
  // 호버링 또는 선택된 상태
  const isHighlighted = isHovered || isSelected;

  return (
    <CustomOverlayMap
      position={{
        lat: library.location.latitude,
        lng: library.location.longitude,
      }}
      yAnchor={1}
      xAnchor={0.5}
      zIndex={isHighlighted ? 100 : 0}
    >
      <div
        className={`
          flex flex-col items-center transition-all duration-300 cursor-pointer
          ${isHighlighted ? "scale-110" : ""}
          touch-manipulation
        `}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {/* 상단: 도서관 아이콘 + 도서관 이름 (작게) */}
        <div
          className={`
            flex items-center gap-1 px-2 py-1 rounded-md shadow-md text-xs
            transition-all duration-300 mb-1
            ${isHighlighted ? "bg-primary text-white" : "bg-white text-primary"}
          `}
        >
          <BookOpen size={12} />
          <span className="font-medium">{library.name}</span>
        </div>

        <div
          className={`
              w-10 h-10 rounded-full flex items-center justify-center shadow-md
              transition-all duration-300
              ${isHighlighted ? "bg-primary text-white" : "bg-white text-primary"}
            `}
        >
          <BookOpen size={16} />
        </div>
      </div>
    </CustomOverlayMap>
  );
};
