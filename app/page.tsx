import { BookSearchBar } from "@/components/organisms/search/BookSearchBar";
import { BookPreviewList } from "@/components/templates/BookPrevewListTemplate";
import { Pageable } from "@/types/Pageable";
import { findBooksPreview, SearchCondition } from "@/utils/api/BookPreviewApi";
import { toRawQueryString } from "@/utils/querystring/QueryString";
import { LEVEL_LEAF } from "@/utils/querystring/CategoryId";
import { TitleAndSubButton } from "@/components/molecules/title/TitleAndSubButton";
import { POPULAR_CATEGORY_IDS } from "@/types/BookCategory";

/*
랜덤 렌더링 과정이 있기 때문에 스태틱으로 빌드 할 수 없음
CDN 캐싱이 안되서 로딩과정이 백엔드 API 요청과정만큼 증가하지만, 
랜덤으로 컨텐츠를 보여줘서 UX가 좋아질 가능성은 있음.
*/
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const recommendPageable: Pageable = {
    pageNumber: 0,
    pageSize: 6,
  };

  function getRandomPopularCategoryId(): number {
    const index = Math.floor(Math.random() * POPULAR_CATEGORY_IDS.length);
    return POPULAR_CATEGORY_IDS[index];
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
