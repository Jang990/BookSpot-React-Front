import { fetchBookshelfDetail } from "@/utils/api/BookshelfApi";
import { BookPreview } from "@/types/BookPreview";
import { CommonShelf, MAX_SHELF_BOOK_COUNT } from "@/types/Bookshelf";
import { findBooksPreview } from "@/utils/api/BookPreviewApi";
import { BookshelfDetailTemplate } from "@/components/templates/BookShelfDetailTemplate";
import PageNotFound from "@/app/not-found";
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";

export default async function BookshelfDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const shelfId = await (await params).id;
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
      : (
          await findBooksPreview(
            { bookIds: bookIds, categoryCond: null },
            { pageNumber: 0, pageSize: MAX_SHELF_BOOK_COUNT },
            "server"
          )
        ).books;

  return <BookshelfDetailTemplate initShelf={shelf} initBooks={books} />;
}
