"use client";

import { X, Book, Info, MapPin, RefreshCw } from "lucide-react";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { BookPreview } from "@/types/BookPreview";
import { useEffect, useState } from "react";
import { LibraryDetailContentPanel } from "./LibraryDetailContentPanel";
import { BookLoanStatePanel } from "./panel/BookLoanStatePanel";
import { LibraryBookStockInfo } from "@/types/Loan";
import { createApi } from "@/utils/api/LibraryBookStockApi";

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

  useEffect(() => {
    if (!stock) return;
    const api = createApi({
      libraryId: library.id,
      bookIds: stock.availableBookIds,
    });
  }, [library, stock]);

  const availableBookIds = stock?.availableBookIds ?? [];

  const libraryBookStockInfos: LibraryBookStockInfo[] = stock
    ? books
        .filter(
          (book) =>
            stock.availableBookIds.includes(book.id) ||
            stock.unavailableBookIds.includes(book.id)
        )
        .map((book: BookPreview) => {
          return {
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.author,
            bookPublicationYear: book.publicationYear,
            isInLibrary: availableBookIds.includes(book.id),
            loanInfo: null,
          };
        })
    : [];

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
          <BooksTap
            bookStockInfos={libraryBookStockInfos}
            handleRefresh={() => {}}
          />
        ) : (
          <LibraryDetailContentPanel library={library} />
        )}
      </div>
    </div>
  );
};

interface BooksTapProps {
  bookStockInfos: LibraryBookStockInfo[];
  handleRefresh: () => void;
}

const BooksTap = ({ bookStockInfos: books, handleRefresh }: BooksTapProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold ps-2 text-gray-700">
            도서 목록
          </h3>
          <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-medium">
            전날 기준
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          title="대출 가능여부 새로고침"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {books.length > 0 ? (
        <ul className="space-y-2">
          {books.map((book: LibraryBookStockInfo, idx) => {
            return (
              <li key={idx}>
                <BookLoanStatePanel libraryBookStockInfo={book} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          도서 정보가 없습니다.
        </p>
      )}
    </div>
  );
};
