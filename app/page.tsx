import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview } from "@/utils/api/BookPreviewApi";
import {
  parsePage,
  parseSearchTerm,
  toRawQueryString,
} from "@/utils/QueryString";
import { PageNavigator } from "@/components/organisms/PageNavigator";

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

  const { books, totalPage, searchAfter } = await findBooksPreview(
    { keyword: searchTerm },
    pageable
  );

  return (
    <>
      <BookSearchBar
        initialSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
      />

      <BookPreviewList searchResults={books} />

      <PageNavigator totalPages={totalPage} searchAfter={searchAfter} />
    </>
  );
}
