import { BookPreview } from "@/types/BookPreview";
import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { PageNavigator } from "@/components/molecules/PageNavigator";
import { MIN_SEARCH_TERM_LENGTH, Pageable } from "@/types/Pageable";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { toRawQueryString } from "@/utils/QueryString";

const ITEMS_PER_PAGE = 12;
const FIRST_PAGE = 1;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams, params }: Props) {
  const libraryId = (await params).id;
  const rawSearchTerm = (await searchParams).searchTerm;
  const rawPage = (await searchParams).page;

  const searchTerm =
    !rawSearchTerm || Array.isArray(rawSearchTerm) ? "" : rawSearchTerm;
  const page = parsePage(rawPage);

  function parsePage(rawPage: string | string[] | undefined): number {
    if (!rawPage || Array.isArray(rawPage)) return FIRST_PAGE;

    const parsed = Number.parseInt(rawPage, 10);
    if (Number.isNaN(parsed) || parsed < FIRST_PAGE) return FIRST_PAGE;

    return parsed;
  }

  const pageable: Pageable = {
    pageNumber: page - 1,
    pageSize: ITEMS_PER_PAGE,
  };

  let totalPage = 0;
  let books: BookPreview[] = [];

  // 방어: 키워드 없거나 길이 2 미만이면 빈배열, 0페이지
  if (!searchTerm || searchTerm.length < MIN_SEARCH_TERM_LENGTH) {
    totalPage = 0;
    books = [];
  } else {
    const json = await fetchBooksPreview({
      keyword: searchTerm,
      libraryId: libraryId,
      pageable,
    });
    totalPage = json.totalPages;
    books = json.content.map(convertBookPreview);
  }

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
