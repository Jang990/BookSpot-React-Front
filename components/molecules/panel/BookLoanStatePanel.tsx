import { LibraryBookStockInfo } from "@/types/Loan";
import { Check, TriangleAlert, X } from "lucide-react";

interface BookLoanStatePanelProps {
  libraryBookStockInfo: LibraryBookStockInfo;
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

export const BookLoanStatePanel = ({
  libraryBookStockInfo: stockInfo,
}: BookLoanStatePanelProps) => {
  const loanInfo =
    mockLoanStatus[
      ((Number.parseInt(stockInfo.bookId) % 3) +
        1) as keyof typeof mockLoanStatus
    ];
  const isLoanAvailable = stockInfo.isInLibrary && loanInfo?.available;

  let bgColor, borderColor, iconBg, icon, textColor, badgeColor, badgeText;

  if (!stockInfo.isInLibrary) {
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
    icon = <TriangleAlert size={16} className="text-yellow-600" />;
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
          {stockInfo.bookTitle}
        </p>
        <p className="text-xs text-gray-600 truncate mb-0.5">
          {stockInfo.bookAuthor} · {stockInfo.bookPublicationYear}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${badgeColor}`}
          >
            {badgeText}
          </span>
          {stockInfo.isInLibrary && loanInfo && (
            <span className="text-gray-500">
              {getTimeAgo(loanInfo.checkedAt)} 확인됨
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
