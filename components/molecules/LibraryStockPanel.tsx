"use client";

import {
  Check,
  X,
  Book,
  Info,
  MapPin,
  RefreshCw,
  BookOpen,
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
            books={allBooks}
            availableBookIds={stock?.availableBookIds ?? []}
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
  books: BookPreview[];
  availableBookIds: string[];
  handleRefresh: () => void;
}

const mockLoanStatus = {
  1: {
    available: true,
    checkedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  }, // 3일 전
  2: {
    available: false,
    checkedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  }, // 1주 전
  3: {
    available: true,
    checkedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  }, // 1일 전
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}일 전`;
  }
};

const BooksTap = ({
  books,
  availableBookIds = [],
  handleRefresh,
}: BooksTapProps) => {
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
          {books.map((book: any, idx) => {
            return (
              <li key={idx}>
                <BookLoanStatePanel
                  book={book}
                  isInLibrary={availableBookIds.includes(book.id)}
                />
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

interface BookLoanStatePanelProps {
  isInLibrary: boolean;
  book: BookPreview;
}

const BookLoanStatePanel = ({ isInLibrary, book }: BookLoanStatePanelProps) => {
  const loanInfo =
    mockLoanStatus[
      ((Number.parseInt(book.id) % 3) + 1) as keyof typeof mockLoanStatus
    ];
  const isLoanAvailable = isInLibrary && loanInfo?.available;

  let bgColor, borderColor, iconBg, icon, textColor, badgeColor, badgeText;

  if (!isInLibrary) {
    bgColor = "bg-gray-50";
    borderColor = "border-gray-200";
    iconBg = "bg-gray-100";
    icon = <X size={16} className="text-gray-600" />;
    textColor = "text-gray-800";
    badgeColor = "bg-gray-100 text-gray-700";
    badgeText = "미소장";
  } else if (isLoanAvailable) {
    bgColor = "bg-green-50";
    borderColor = "border-green-200";
    iconBg = "bg-green-100";
    icon = <Check size={16} className="text-green-600" />;
    textColor = "text-green-800";
    badgeColor = "bg-green-100 text-green-700";
    badgeText = "대출 가능";
  } else {
    bgColor = "bg-yellow-50";
    borderColor = "border-yellow-200";
    iconBg = "bg-yellow-100";
    icon = <BookOpen size={16} className="text-yellow-600" />;
    textColor = "text-yellow-800";
    badgeColor = "bg-yellow-100 text-yellow-700";
    badgeText = "대출 중";
  }

  return (
    <div
      className={`
                  flex items-start p-1.5 rounded-lg border transition-colors
                  ${bgColor} ${borderColor}
                `}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate text-sm ${textColor}`}>
          {book.title}
        </p>
        <p className="text-xs text-gray-600 truncate mb-0.5">
          {book.author} · {book.publicationYear}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${badgeColor}`}
          >
            {badgeText}
          </span>
          {isInLibrary && loanInfo && (
            <span className="text-gray-500">
              {getTimeAgo(loanInfo.checkedAt)} 확인됨
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
