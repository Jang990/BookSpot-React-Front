import { Pageable } from "@/types/Pageable";
import { findBooksPreview } from "@/utils/api/BookPreviewApi";
import { cookies } from "next/headers";
import { STORAGE_NAME } from "@/utils/BookCartLocalStorage";
import { BookCartListTemplate } from "@/components/templates/BookCartListTemplate";
import { BookCartPopup } from "@/components/organisms/BookCartPopup";
import { BookPreview } from "@/types/BookPreview";

const MAX_CART_SIZE = 20;
const FIRST_PAGE = 0;
const CART_PAGEABLE: Pageable = {
  pageNumber: FIRST_PAGE,
  pageSize: MAX_CART_SIZE,
};
export default async function Cart({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const keyword = params?.keyword ?? null;

  const cookieVal = (await cookies()).get(STORAGE_NAME)?.value ?? "[]";
  const bookIds: string[] = JSON.parse(cookieVal);

  const books = await findBookCartList(bookIds);

  async function findBookCartList(bookIds: string[]): Promise<BookPreview[]> {
    if (bookIds.length === 0) return Promise.resolve([]);
    return (
      await findBooksPreview(
        {
          keyword: keyword,
          bookIds: bookIds,
          categoryCond: null,
        },
        CART_PAGEABLE
      )
    ).books;
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <BookCartListTemplate books={books}></BookCartListTemplate>

      <BookCartPopup></BookCartPopup>
    </div>
  );
}
