"use client";

import {
  ExternalLink,
  Clock,
  Calendar,
  Check,
  X,
  Book,
  Info,
  MapPin,
} from "lucide-react";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { useState } from "react";

interface LibraryStockPanelProps {
  libraryMarkerInfo: LibraryMarkerInfo;
  onClose: () => void;
  isEntering: boolean;
  onMoveToLocation?: () => void;
}

export const LibrarySelectionPanel = ({
  libraryMarkerInfo,
  onClose,
  isEntering,
  onMoveToLocation,
}: LibraryStockPanelProps) => {
  const { library } = libraryMarkerInfo;
  const [activeTab, setActiveTab] = useState<"books" | "info">("info");

  return (
    <div
      className={`
        absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-lg shadow-lg z-50 
        max-h-[250px] overflow-hidden transition-all duration-250
        ${isEntering ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
      style={{ pointerEvents: isEntering ? "auto" : "none" }} // 애니메이션 중에는 클릭 이벤트 무시
    >
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-bold text-primary truncate">
          {library.name}
        </h2>
        <div className="flex items-center space-x-2">
          {onMoveToLocation && (
            <button
              onClick={onMoveToLocation}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="위치로 이동"
              title="지도에서 위치 보기"
            >
              <MapPin size={16} />
            </button>
          )}
          <button
            onClick={() => setActiveTab("info")}
            className={`p-1.5 rounded-md transition-colors ${
              activeTab === "info"
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="도서관 정보"
          >
            <Info size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="닫기"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div
        id="library-panel-content"
        className="overflow-auto p-3"
        style={{ maxHeight: "200px" }}
      >
        <div className="space-y-2.5">
          <div className="flex items-start text-sm text-gray-600">
            <span className="mr-2 text-primary flex-shrink-0 mt-0.5">📍</span>
            <span className="text-sm">{library.address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <ExternalLink
              size={14}
              className="mr-2 text-primary flex-shrink-0"
            />
            <a
              href={library.homePage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              홈페이지 방문하기
            </a>
          </div>

          <div className="flex items-start text-sm text-gray-600">
            <Clock
              size={14}
              className="mr-2 text-primary flex-shrink-0 mt-0.5"
            />
            <span className="text-sm">{library.operatingInfo}</span>
          </div>

          <div className="flex items-start text-sm text-gray-600">
            <Calendar
              size={14}
              className="mr-2 text-primary flex-shrink-0 mt-0.5"
            />
            <span className="text-sm">휴관일: {library.closedInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
