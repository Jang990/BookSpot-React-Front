"use client";

import { X, Book, Info, MapPin, RefreshCw } from "lucide-react";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { BookPreview } from "@/types/BookPreview";
import { useEffect, useState } from "react";
import { LibraryDetailContentPanel } from "./LibraryDetailContentPanel";
import { BookLoanStatePanel } from "./panel/BookLoanStatePanel";
import { LibraryBookStockInfo, LoanInfo } from "@/types/Loan";
import { fetchStocks } from "@/utils/api/LibraryBookStockApi";
import { refreshStock } from "@/utils/api/LibraryStockRefreshApi";
import { InfoPanel } from "./InfoPanel";
import { UnauthorizedError } from "@/utils/api/common/Errors";
import { useSession } from "next-auth/react";
import { useToast } from "@/contexts/ToastContext";

interface LibraryStockPanelProps {
  libraryMarkerInfo: LibraryMarkerInfo;
  books: BookPreview[];
  onClose: () => void;
  isEntering: boolean;
  onMoveToLocation?: () => void;
}

function isToday(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

const REFRESH_AUTH_ERROR_MESSAGE =
  "대출 현황 조회는 로그인이 필요한 기능입니다.";
export const LibraryStockPanel = ({
  libraryMarkerInfo,
  books,
  onClose,
  isEntering,
  onMoveToLocation,
}: LibraryStockPanelProps) => {
  const { library, stock } = libraryMarkerInfo;
  const [activeTab, setActiveTab] = useState<"books" | "info">("books");
  const { status } = useSession();
  const { showToast } = useToast();

  const baseStockInfos: LibraryBookStockInfo[] = stock
    ? books
        .filter(
          (book) =>
            stock.availableBookIds.includes(book.id) ||
            stock.unavailableBookIds.includes(book.id)
        )
        .map((book) => ({
          bookId: book.id,
          bookTitle: book.title,
          bookAuthor: book.author,
          bookPublicationYear: book.publicationYear,
          isInLibrary: stock.availableBookIds.includes(book.id),
          loanInfo: null,
        }))
    : [];
  const [stockInfos, setLibraryBookStockInfos] =
    useState<LibraryBookStockInfo[]>(baseStockInfos);
  const [isStockRefreshing, setIsStockRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (!stock) return;

    setLibraryBookStockInfos(baseStockInfos);

    const inLibraryIds = baseStockInfos
      .filter((info) => info.isInLibrary)
      .map((info) => info.bookId);

    if (inLibraryIds.length === 0) return;

    fetchStocks({
      libraryId: library.id,
      bookIds: inLibraryIds,
      side: "client",
    }).then((loanInfos: LoanInfo[]) => {
      setLibraryBookStockInfos((prev) =>
        prev.map((info) => {
          const loan = loanInfos.find((l) => l.bookId === info.bookId);
          return loan ? { ...info, loanInfo: loan } : info;
        })
      );
    });
  }, [library.id]);

  /** 기간 동안 refresh 아이콘 동작 */
  function momentaryRefresh(duration = 500) {
    setIsStockRefreshing(true);
    setTimeout(() => setIsStockRefreshing(false), duration);
  }

  async function handleRefresh() {
    if (status !== "authenticated") {
      momentaryRefresh();
      showToast(REFRESH_AUTH_ERROR_MESSAGE, "WARN");
      return;
    }

    if (!stockInfos.some((info) => info.loanInfo !== null)) {
      // refresh 대상 없음: loanInfo가 모두 null
      momentaryRefresh();
      return;
    }

    const targets = stockInfos.filter(
      (info) =>
        info.isInLibrary && info.loanInfo && !isToday(info.loanInfo.updatedAt)
    );

    if (targets.length === 0) {
      momentaryRefresh();
      return;
    }
    setIsStockRefreshing(true);

    try {
      const updates = await Promise.all(
        targets.map((info) =>
          refreshStock({ stockId: info.loanInfo!.stockId, side: "client" })
        )
      );

      // loanInfo들을 종합해서 한 번에 반영
      setLibraryBookStockInfos((prev) =>
        prev.map((i) => {
          const updated = updates.find((u) => u.bookId === i.bookId);
          return updated ? { ...i, loanInfo: updated } : i;
        })
      );
    } catch (e) {
      console.error("refresh 중 오류 발생:", e);

      if (e instanceof UnauthorizedError) {
        showToast(REFRESH_AUTH_ERROR_MESSAGE, "WARN");
        return;
      }

      showToast("알 수 없는 오류가 발생했습니다", "WARN");
    } finally {
      setIsStockRefreshing(false);
    }
  }

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
            supportsLoanStatus={library.supportsLoanStatus}
            bookStockInfos={stockInfos}
            handleRefresh={handleRefresh}
            isStockRefreshing={isStockRefreshing}
          />
        ) : (
          <LibraryDetailContentPanel library={library} />
        )}
      </div>
    </div>
  );
};

interface BooksTapProps {
  supportsLoanStatus: boolean;
  bookStockInfos: LibraryBookStockInfo[];
  isStockRefreshing: boolean;
  handleRefresh: () => void;
}

const BooksTap = ({
  supportsLoanStatus,
  bookStockInfos: books,
  isStockRefreshing,
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
          disabled={isStockRefreshing} // 새로고침 중엔 중복 클릭 방지
        >
          <RefreshCw
            size={16}
            className={isStockRefreshing ? "animate-spin" : ""}
          />
        </button>
      </div>

      {books.length > 0 ? (
        <ul className="space-y-2">
          {books.map((book: LibraryBookStockInfo) => {
            return (
              <li key={book.bookId}>
                <BookLoanStatePanel libraryBookStockInfo={book} />
              </li>
            );
          })}
          <li>
            <InfoPanel text="하루 전 대출 가능여부만 확인할 수 있습니다." />
          </li>
        </ul>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          도서 정보가 없습니다.
        </p>
      )}
    </div>
  );
};
