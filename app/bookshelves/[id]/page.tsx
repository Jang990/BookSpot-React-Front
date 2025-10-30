import { fetchBookshelfDetail } from "@/utils/api/BookshelfApi";
import { BookPreview } from "@/types/BookPreview";
import { CommonShelf } from "@/types/Bookshelf";
import { findBooksPreviewWithIds } from "@/utils/api/BookPreviewApi";
import { BookshelfDetailTemplate } from "@/components/templates/BookShelfDetailTemplate";
import PageNotFound from "@/app/not-found";
import { parseRedirectUri } from "@/utils/querystring/RedirectUri";

export default async function BookshelfDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const shelfId = await (await params).id;

  const queryStrings = await searchParams;
  const redirectUri = parseRedirectUri(queryStrings);

  if (!shelfId) return <PageNotFound />;

  // 책장 정보를 불러옴
  const response = await fetchBookshelfDetail({
    shelfId: shelfId,
    side: "server",
  });

  const shelf: CommonShelf = response;
  const bookIds: string[] = response.bookIds;

  // 책장의 책정보를 불러옴
  const books: BookPreview[] =
    bookIds.length === 0
      ? []
      : await findBooksPreviewWithIds({ bookIds: bookIds, side: "server" });

  return (
    <BookshelfDetailTemplate
      initShelf={shelf}
      initBooks={books}
      redirectUri={redirectUri}
    />
  );
}
