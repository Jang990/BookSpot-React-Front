import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { PageNavigator } from "@/components/molecules/pagination/PageNavigator";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview, PagingResult } from "@/utils/api/BookPreviewApi";
import {
  parsePage,
  parseSearchTerm,
  toRawQueryString,
} from "@/utils/QueryString";
import { CursorPageNavigator } from "@/components/molecules/pagination/CursorPageNavigator";

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const MAX_PAGINATED_PAGES = 50;
export default async function Home({ searchParams }: Props) {
  const queryStrings = await searchParams;

  const searchTerm = parseSearchTerm(queryStrings);
  const page = parsePage(queryStrings);
  const pageable: Pageable = {
    pageNumber: page - 1,
    pageSize: ITEMS_PER_PAGE,
  };

  const { totalPage, books }: PagingResult = await findBooksPreview({
    keyword: searchTerm,
    pageable,
  });

  return (
    <>
      <BookSearchBar
        initialSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
      />

      <BookPreviewList searchResults={books} />
      {page <= 50 ? (
        <PageNavigator
          searchTerm={searchTerm}
          currentPage={page}
          totalPages={totalPage}
        />
      ) : (
        <CursorPageNavigator searchTerm={searchTerm} currentPage={page} />
      )}
    </>
  );
}
