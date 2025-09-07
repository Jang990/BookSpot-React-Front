import { cookies } from "next/headers";
import { STORAGE_NAME } from "@/utils/BagLocalStorage";
import { BookBagListTemplate } from "@/components/templates/BookBagListTemplate";

export default async function Cart() {
  const cookieVal = (await cookies()).get(STORAGE_NAME)?.value ?? "[]";
  const bookIds: string[] = JSON.parse(cookieVal);

  return (
    <div>
      <BookBagListTemplate bookIds={bookIds}></BookBagListTemplate>
    </div>
  );
}
