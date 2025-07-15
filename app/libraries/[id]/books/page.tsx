import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { PageNavigator } from "@/components/molecules/PageNavigator";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview, PagingResult } from "@/utils/api/BookPreviewApi";
import {
  parsePage,
  parseSearchTerm,
  toRawQueryString,
} from "@/utils/QueryString";

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
  const pageable: Pageable = {
    pageNumber: page - 1,
    pageSize: ITEMS_PER_PAGE,
  };

  const { totalPage, books }: PagingResult = await findBooksPreview({
    keyword: searchTerm,
    libraryId: libraryId,
    pageable,
  });

  return (
    <>
      <BookSearchBar
        initialSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
        libraryId={libraryId}
      />

      <BookPreviewList searchResults={books} />

      <PageNavigator
        searchTerm={searchTerm}
        currentPage={page}
        totalPages={totalPage}
      />
    </>
  );
}
