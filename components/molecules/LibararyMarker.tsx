import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { OUT_OF_ZOOM_STOCK } from "@/types/LibraryStock";
import { BookOpen, Search } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface LibraryMarkerProps {
  libraryMarkerInfo: LibraryMarkerInfo;
  isHovered: boolean;
  isSelected: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
}

export const LibraryMarker = ({
  libraryMarkerInfo,
  isHovered,
  isSelected,
  onMouseOver,
  onMouseOut,
  onClick,
}: LibraryMarkerProps) => {
  const { library, stock } = libraryMarkerInfo;

  // 재고 정보 계산
  const availableCount = stock?.availableBookIds.length || 0;
  const totalCount = stock?.totalBooksCount || 0;
  const isSearching = stock === undefined; // stock이 null이면 검색 중
  const isOutOfZoom = stock !== undefined && stock === OUT_OF_ZOOM_STOCK;
  const isAvailableStockData =
    stock !== undefined && stock !== OUT_OF_ZOOM_STOCK;

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

        {/* 하단: 재고 정보 (원 형태) */}
        {isAvailableStockData && (
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center shadow-md
              text-xs font-bold transition-all duration-300
              ${isHighlighted ? "bg-primary text-white" : "bg-white text-primary"}
            `}
          >
            {availableCount} / {totalCount}
          </div>
        )}

        {/* 검색 중인 경우 */}
        {isSearching && (
          <div
            className={`
              w-10 h-10 rounded-full flex flex-col items-center justify-center shadow-md
              text-[10px] font-medium transition-all duration-300
              ${isHighlighted ? "bg-primary text-white" : "bg-white text-primary"}
            `}
          >
            <Search size={12} className="mb-0.5" />
            <span>검색중</span>
          </div>
        )}

        {isOutOfZoom && (
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center shadow-md
              transition-all duration-300
              ${isHighlighted ? "bg-primary text-white" : "bg-white text-primary"}
            `}
          >
            <BookOpen size={16} />
          </div>
        )}
      </div>
    </CustomOverlayMap>
  );
};
