import { BookPreview } from "@/types/BookPreview";
import { Pageable } from "@/types/Pageable";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { convertBookPreview } from "@/utils/api/ApiResponseConvertor";
import { cookies } from "next/headers";
import { STORAGE_NAME } from "@/utils/BookCartLocalStorage";
import { BookCartListTemplate } from "@/components/templates/BookCartListTemplate";
import { BookCartPopup } from "@/components/organisms/BookCartPopup";

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

  const books: BookPreview[] = await fetchBooksPreview(
    {
      keyword: keyword,
      bookIds: bookIds,
    },
    CART_PAGEABLE
  ).then((json) => {
    if (!json.content) return [];
    return json.content.map(convertBookPreview);
  });

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <BookCartListTemplate books={books}></BookCartListTemplate>

      <BookCartPopup></BookCartPopup>
    </div>
  );
}
