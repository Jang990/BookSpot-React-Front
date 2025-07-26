import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { Pageable, SearchAfter } from "@/types/Pageable";
import {
  findBooksPreview,
  findBooksPreviewWithSA,
} from "@/utils/api/BookPreviewApi";
import { parseNumber, toRawQueryString } from "@/utils/querystring/QueryString";
import { PageNavigator } from "@/components/organisms/PageNavigator";
import { parseSearchTerm } from "@/utils/querystring/SearchTerm";
import { parsePage } from "@/utils/querystring/PageNumber";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
} from "@/utils/querystring/SearchAfter";
import { BookPreview } from "@/types/BookPreview";

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const MAX_PAGINATED_PAGES = 50;
export default async function Home({ searchParams }: Props) {
  const queryStrings = await searchParams;

  const searchTerm = parseSearchTerm(queryStrings);
  const page = parsePage(queryStrings);

  const lastBookId = parseNumber(queryStrings, LAST_BOOK_ID_KEY);
  const lastLoanCount = parseNumber(queryStrings, LAST_LOAN_COUNT_KEY);

  const pageable: Pageable = {
    pageNumber: page - 1,
    pageSize: ITEMS_PER_PAGE,
  };

  let totalPages: number | null;
  let books: BookPreview[];
  let searchAfter: SearchAfter;

  const hasCursorCond = lastLoanCount !== null && lastBookId !== null;
  const isOutOfPageNumber: boolean = page > MAX_PAGINATED_PAGES;

  if (hasCursorCond && isOutOfPageNumber) {
    const result = await findBooksPreviewWithSA(
      { keyword: searchTerm },
      { lastLoanCount: lastLoanCount, lastBookId: lastBookId }
    );
    books = result.books;
    totalPages = null;
    searchAfter = result.searchAfter;
  } else {
    const result = await findBooksPreview({ keyword: searchTerm }, pageable);
    books = result.books;
    totalPages = result.totalPage;
    searchAfter = result.searchAfter;
  }

  return (
    <>
      <BookSearchBar
        initialSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
      />

      <BookPreviewList searchResults={books} />

      <PageNavigator totalPages={totalPages} searchAfter={searchAfter} />
    </>
  );
}
