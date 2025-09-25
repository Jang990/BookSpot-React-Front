import { BookSearchBar } from "@/components/organisms/search/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview, SearchCondition } from "@/utils/api/BookPreviewApi";
import { toRawQueryString } from "@/utils/querystring/QueryString";
import { LEVEL_LEAF } from "@/utils/querystring/CategoryId";
import { TitleAndSubButton } from "@/components/molecules/TitleAndSubButton";
import { CATEGORY_ARRAY } from "@/types/BookCategory";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const recommendPageable: Pageable = {
    pageNumber: 0,
    pageSize: 6,
  };

  function getRandomPopularCategoryId(): number {
    const index = Math.floor(Math.random() * CATEGORY_ARRAY.length);
    return CATEGORY_ARRAY[index].id;
  }
  const randomCategoryId = getRandomPopularCategoryId();

  const searchCond: SearchCondition = {
    categoryCond: {
      categoryId: randomCategoryId.toString(),
      categoryLevel: LEVEL_LEAF,
    },
  };

  const result = await findBooksPreview(
    searchCond,
    recommendPageable,
    "server"
  );
  const books = result.books;

  return (
    <div>
      <div className="mt-2">
        <BookSearchBar
          initSearchTerm={null}
          bookQueryString={toRawQueryString(await searchParams)}
          libraryId={null}
          categoryId={null}
        />
      </div>

      <div className="mt-5">
        <TitleAndSubButton
          title="이런 책 어때요?"
          subButtonText="더보기"
          categoryId={randomCategoryId}
        />

        <BookPreviewList searchResults={books} />
      </div>
    </div>
  );
}
