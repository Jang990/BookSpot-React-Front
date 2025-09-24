import { SkeletonDiv } from "@/components/atoms/SkeletonDiv";
import { LibraryBookStockInfo, LoanInfo } from "@/types/Loan";
import { Check, ExternalLink, X } from "lucide-react";
import { DEFAULT_TEXT, DEFAULT_TITLE } from "../BookPreviewInfo";
import {
  GrayBadge,
  GreenBadge,
  RedBadge,
  YellowBadge,
} from "@/components/atoms/badge/TextLabelBadge";

interface BookLoanStatePanelProps {
  supportsLoanStatus: boolean;
  libraryBookStockInfo: LibraryBookStockInfo;
  isbnSearchPattern: string | null;
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (!isSameDay) {
    if (diffDays <= 1) return "1일 전";
    if (diffDays < 14) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}달 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  }

  if (diffHours > 0) return `${diffHours}시간 전`;
  if (diffMinutes > 0) return `${diffMinutes}분 전`;
  return `방금 전`;
}

export const BookLoanStatePanel = ({
  supportsLoanStatus,
  libraryBookStockInfo: stockInfo,
  isbnSearchPattern,
}: BookLoanStatePanelProps) => {
  const bgColor = stockInfo.isInLibrary ? "bg-green-50" : "bg-red-50";
  const borderColor = stockInfo.isInLibrary
    ? "border-green-200"
    : "border-red-200";
  const iconBg = stockInfo.isInLibrary ? "bg-green-100" : "bg-red-100";
  const icon = stockInfo.isInLibrary ? (
    <Check size={16} className="text-green-600" />
  ) : (
    <X size={16} className="text-red-600" />
  );
  const textColor = stockInfo.isInLibrary ? "text-green-800" : "text-red-800";

  function subInfoLabelText(): string {
    return `${stockInfo.bookAuthor ?? DEFAULT_TEXT} · ${stockInfo.bookPublicationYear ?? DEFAULT_TEXT}`;
  }

  const subjectCodeText =
    stockInfo.loanInfo == null
      ? undefined
      : (stockInfo.loanInfo.subjectCode ?? "알 수 없음");

  const isbnSearchLink =
    isbnSearchPattern && `${isbnSearchPattern}${stockInfo.bookIsbn13}`;
  return (
    <div
      className={`
          rounded-lg border transition-colors
          ${bgColor} ${borderColor}
        `}
    >
      <div className="flex items-start p-1.5">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <TitleAndSubTitle
            title={stockInfo.bookTitle ?? DEFAULT_TITLE}
            titleTextColor={textColor}
            subTitle={subjectCodeText}
          />
          <p className="text-xs text-gray-600 truncate mb-0.5">
            {subInfoLabelText()}
          </p>
          {stockInfo.isInLibrary && supportsLoanStatus && (
            <LoanStatusLine loanInfo={stockInfo.loanInfo} />
          )}
        </div>
      </div>
      {isbnSearchLink && (
        <LibrarySearchExternalButton isbnSearchLink={isbnSearchLink} />
      )}
    </div>
  );
};

interface LoanBadgeProps {
  loanInfo: LoanInfo | null;
}

const LoanStatusLine = ({ loanInfo }: LoanBadgeProps) => {
  const hasLoanInfo = loanInfo !== null;
  const loanState = loanInfo?.loanState;

  let badgeElement = null;

  if (hasLoanInfo && loanState === "LOANABLE") {
    badgeElement = <GreenBadge text="대출 가능" />;
  } else if (hasLoanInfo && loanState === "ON_LOAN") {
    badgeElement = <YellowBadge text="대출 중" />;
  } else if (hasLoanInfo && loanState === "ERROR") {
    badgeElement = <RedBadge text="도서 오류(관리자 문의)" />;
  } else if (hasLoanInfo && loanState === "UNKNOWN") {
    badgeElement = <GrayBadge text="미확인" />;
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      {hasLoanInfo ? (
        <>
          {badgeElement}
          {loanState !== "UNKNOWN" && (
            <span className="text-gray-500">
              {getTimeAgo(loanInfo.updatedAt)} 확인됨
            </span>
          )}
        </>
      ) : (
        <>
          <SkeletonDiv width="w-12" height="h-4" />
          <SkeletonDiv width="w-12" height="h-4" />
        </>
      )}
    </div>
  );
};

interface Props {
  title: string;
  titleTextColor?: string;
  subTitle?: string;
}

export const TitleAndSubTitle = ({
  title,
  titleTextColor,
  subTitle,
}: Props) => {
  return (
    <div className="flex items-center justify-between overflow-hidden">
      {/* 왼쪽 */}
      <div className="flex items-center overflow-hidden min-w-0 ">
        <h1 className={`font-medium text-sm truncate ${titleTextColor}`}>
          {title}
        </h1>
      </div>

      {/* 오른쪽 결과 수 */}
      {subTitle && (
        <div className="px-2 self-end justify-self-end flex-shrink-0 select-none">
          <span className="text-sm text-muted-foreground">{subTitle}</span>
        </div>
      )}
    </div>
  );
};

interface LibrarySearchExternalButtonProps {
  isbnSearchLink: string;
}

const LibrarySearchExternalButton = ({
  isbnSearchLink,
}: LibrarySearchExternalButtonProps) => {
  return (
    <div className="border-t border-gray-200/50 px-1.5 py-0.5 hover:text-gray-800 hover:bg-primary/10">
      <button
        onClick={() => window.open(isbnSearchLink, "_blank")}
        className="w-full text-xs text-gray-600 flex items-center justify-center gap-1 py-1 rounded transition-colors"
      >
        <ExternalLink size={12} />
        도서관에서 확인하기
      </button>
    </div>
  );
};
