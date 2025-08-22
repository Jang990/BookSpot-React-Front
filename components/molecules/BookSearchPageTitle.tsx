import clsx from "clsx";

interface Props {
  searchTerm: string | null;
  totalElements: number;
}

export const BookSearchPageTitle = ({ searchTerm, totalElements }: Props) => {
  return (
    <div className="ps-3 mt-2 mb-3 flex items-center justify-between overflow-hidden">
      {/* 왼쪽 */}
      <div className="flex items-center overflow-hidden min-w-0">
        {searchTerm ? (
          <>
            <SearchTitle text={`"`} isTruncated={false} />
            <SearchTitle text={`${searchTerm}`} isTruncated={true} />
            <SearchTitle text={`"`} isTruncated={false} />
            <h2 className="ms-2 shrink-0 text-sm text-gray-600">검색결과</h2>
          </>
        ) : (
          <SearchTitle text="역대 대출 도서" isTruncated={false} />
        )}
      </div>

      {/* 오른쪽 결과 수 */}
      <SearchResultCount totalElements={totalElements} />
    </div>
  );
};

interface TextProps {
  text: string;
  isTruncated: boolean;
}

const SearchTitle = ({ text, isTruncated }: TextProps) => {
  return (
    <h1
      className={clsx(
        "text-lg font-bold text-gray-800",
        isTruncated && "truncate"
      )}
    >
      {text}
    </h1>
  );
};

interface CountProps {
  totalElements: number;
}

const SearchResultCount = ({ totalElements }: CountProps) => {
  return (
    <div className="px-2 ps-3 self-end justify-self-end flex-shrink-0 select-none">
      <span className="text-muted-foreground">
        {totalElements >= 10_000
          ? `10,000 건 이상`
          : `${totalElements.toLocaleString()} 건`}
      </span>
    </div>
  );
};
