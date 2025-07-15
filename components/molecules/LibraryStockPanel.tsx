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
import { BookPreview } from "@/types/BookPreview";
import { useState } from "react";
import { LibraryDetailContentPanel } from "./LibraryDetailContentPanel";

interface LibraryStockPanelProps {
  libraryMarkerInfo: LibraryMarkerInfo;
  books: BookPreview[];
  onClose: () => void;
  isEntering: boolean;
  onMoveToLocation?: () => void;
}

export const LibraryStockPanel = ({
  libraryMarkerInfo,
  books,
  onClose,
  isEntering,
  onMoveToLocation,
}: LibraryStockPanelProps) => {
  const { library, stock } = libraryMarkerInfo;
  const [activeTab, setActiveTab] = useState<"books" | "info">("books");

  // 모든 책을 하나의 배열로 가져오기
  const allBooks = stock
    ? books.filter(
        (book) =>
          stock.availableBookIds.includes(book.id) ||
          stock.unavailableBookIds.includes(book.id)
      )
    : [];

  // 각 책의 가용성 확인
  const isBookAvailable = (bookId: string) => {
    return stock?.availableBookIds.includes(bookId) || false;
  };

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
            onClick={() => setActiveTab("books")}
            className={`p-1.5 rounded-md transition-colors ${
              activeTab === "books"
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="도서 정보"
          >
            <Book size={16} />
          </button>
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
        {activeTab === "books" ? (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              도서 목록 ({allBooks.length})
            </h3>
            {allBooks.length > 0 ? (
              <ul className="space-y-1.5">
                {allBooks.map((book) => {
                  const available = isBookAvailable(book.id);
                  return (
                    <li
                      key={book.id}
                      className={`
                        flex items-start p-1.5 rounded-md text-sm
                        ${available ? "bg-green-50" : "bg-red-50"}
                      `}
                    >
                      <div
                        className={`
                          w-6 h-6 rounded-md flex items-center justify-center mr-2 flex-shrink-0
                          ${available ? "bg-green-100" : "bg-red-100"}
                        `}
                      >
                        {available ? (
                          <Check size={12} className="text-green-600" />
                        ) : (
                          <X size={12} className="text-red-600" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p
                          className={`
                            font-medium truncate
                            ${available ? "text-green-800" : "text-red-800"}
                          `}
                        >
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {book.author} · {book.publicationYear}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">도서 정보가 없습니다.</p>
            )}
          </div>
        ) : (
          <LibraryDetailContentPanel library={library} />
        )}
      </div>
    </div>
  );
};
