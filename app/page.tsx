import { BookSearchBar } from "@/components/organisms/search/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { MAX_NUMBER_PAGE, Pageable, SearchAfter } from "@/types/Pageable";
import {
  findBooksPreview,
  findBooksPreviewWithSA,
  SearchCondition,
} from "@/utils/api/BookPreviewApi_SSR";
import {
  parseNumber,
  parseString,
  toRawQueryString,
} from "@/utils/querystring/QueryString";
import { PageNavigator } from "@/components/organisms/PageNavigator";
import { parseSearchTerm } from "@/utils/querystring/SearchTerm";
import { parsePage } from "@/utils/querystring/PageNumber";
import {
  LAST_BOOK_ID_KEY,
  LAST_LOAN_COUNT_KEY,
  LAST_SCORE_KEY,
} from "@/utils/querystring/SearchAfter";
import { BookPreview } from "@/types/BookPreview";
import {
  parseCategoryId,
  parseCategoryLevel,
} from "@/utils/querystring/CategoryId";
import { parseLibraryId } from "@/utils/querystring/LibraryId";
import { PageTitle } from "@/components/molecules/PageTitle";
import { BookSearchPageTitle } from "@/components/molecules/BookSearchPageTitle";

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const queryStrings = await searchParams;

  const searchTerm = parseSearchTerm(queryStrings);
  const page = parsePage(queryStrings);
  const libraryId = parseLibraryId(queryStrings);
  const categoryId = parseCategoryId(queryStrings);
  const categoryLevel = parseCategoryLevel(queryStrings);

  const lastBookId = parseNumber(queryStrings, LAST_BOOK_ID_KEY);
  const lastLoanCount = parseNumber(queryStrings, LAST_LOAN_COUNT_KEY);
  const lastScore = parseString(queryStrings, LAST_SCORE_KEY);

  const pageable: Pageable = {
    pageNumber: page - 1,
    pageSize: ITEMS_PER_PAGE,
  };

  let totalPages: number | null;
  let books: BookPreview[];
  let searchAfter: SearchAfter;
  let hasNext: boolean;
  let totalElements = null;

  const hasCursorCond = lastLoanCount !== null && lastBookId !== null;
  const isOutOfPageNumber: boolean = page > MAX_NUMBER_PAGE;
  const searchCond: SearchCondition = {
    keyword: searchTerm,
    libraryId: libraryId?.toString(),
    categoryCond:
      categoryId === null
        ? null
        : {
            categoryId: categoryId.toString(),
            categoryLevel: categoryLevel,
          },
  };

  if (hasCursorCond && isOutOfPageNumber) {
    const result = await findBooksPreviewWithSA(
      searchCond,
      {
        lastScore: lastScore,
        lastLoanCount: lastLoanCount,
        lastBookId: lastBookId,
      },
      "server"
    );
    books = result.books;
    totalPages = null;
    searchAfter = result.searchAfter;
    hasNext = result.hasNext;
    totalElements = result.totalElements;
  } else {
    const result = await findBooksPreview(searchCond, pageable, "server");
    books = result.books;
    totalPages = result.totalPage;
    searchAfter = result.searchAfter;
    hasNext = result.hasNext;
    totalElements = result.totalElements;
  }

  const emptySearchTerm = searchTerm === undefined || searchTerm.length === 0;

  return (
    <div>
      <BookSearchPageTitle
        searchTerm={emptySearchTerm ? null : searchTerm}
        totalElements={totalElements}
      />
      <BookSearchBar
        initSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
        libraryId={libraryId}
        categoryId={categoryId}
      />

      <BookPreviewList searchResults={books} />

      <PageNavigator
        totalPages={totalPages}
        searchAfter={searchAfter}
        hasNext={hasNext}
      />
    </div>
  );
}
