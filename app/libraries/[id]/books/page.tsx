import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview, PagingResult } from "@/utils/api/BookPreviewApi";
import { toRawQueryString } from "@/utils/querystring/QueryString";
import { PageNavigator } from "@/components/organisms/PageNavigator";
import { parseSearchTerm } from "@/utils/querystring/SearchTerm";
import { parsePage } from "@/utils/querystring/PageNumber";
import { parseCategoryId } from "@/utils/querystring/CategoryId";

const ITEMS_PER_PAGE = 12;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams, params }: Props) {
  const libraryId = (await params).id;
  const queryStrings = await searchParams;

  const searchTerm = parseSearchTerm(queryStrings);
  const page = parsePage(queryStrings);
  const categoryId = parseCategoryId(queryStrings);
  const pageable: Pageable = {
    pageNumber: page - 1,
    pageSize: ITEMS_PER_PAGE,
  };

  const { totalPage, books, searchAfter }: PagingResult =
    await findBooksPreview(
      {
        keyword: searchTerm,
        libraryId: libraryId,
      },
      pageable
    );

  return (
    <>
      <BookSearchBar
        initialSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
        libraryId={libraryId}
        categoryId={categoryId}
      />

      <BookPreviewList searchResults={books} />

      <PageNavigator searchAfter={searchAfter} totalPages={totalPage} />
    </>
  );
}
