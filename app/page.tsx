import { BookPreview } from "@/types/BookPreview";
import { BookSearchBar } from "@/components/organisms/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { PageNavigator } from "@/components/molecules/PageNavigator";
import { MIN_SEARCH_TERM_LENGTH, Pageable } from "@/types/Pageable";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import {
  parsePage,
  parseSearchTerm,
  toRawQueryString,
} from "@/utils/QueryString";

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const queryStrings = await searchParams;
  const searchTerm = parseSearchTerm(queryStrings);
  const page = parsePage(queryStrings);

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
      pageable,
    });
    totalPage = json.totalPages;
    books = json.content.map(convertBookPreview);
  }

  /* 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BookPreview[]>([]);
  const loadBooks = useCallback(async (term: string, currentPage: number) => {
    try {
      setIsLoading(true);
      setSearchResults([]);

      const pageable: Pageable = {
        pageNumber: currentPage - 1,
        pageSize: ITEMS_PER_PAGE,
      };
      const json = await fetchBooksPreview({
        keyword: term,
        pageable: pageable,
      });
      setTotalPage(json.totalPages);
      const newBooks = json.content.map(convertBookPreview);
      setSearchResults(newBooks);
    } catch (error) {
      // TODO: 예외 처리 필요
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setPage(FIRST_PAGE);
      loadBooks(term, FIRST_PAGE);
    }, 300),
    []
  );

  useEffect(() => {
    if (isInvalidTermLength()) {
      clearResult();
      return;
    }
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (page < FIRST_PAGE || isInvalidTermLength()) {
      clearResult();
      return;
    }
    loadBooks(searchTerm, page);
  }, [page]);

  function clearResult() {
    setPage(FIRST_PAGE);
    setSearchResults([]);
  }

  function isInvalidTermLength() {
    return !searchTerm || searchTerm.length < MIN_SEARCH_TERM_LENGTH;
  } */

  return (
    <>
      <BookSearchBar
        initialSearchTerm={searchTerm}
        bookQueryString={toRawQueryString(await searchParams)}
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
