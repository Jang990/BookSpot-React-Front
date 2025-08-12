import { cookies } from "next/headers";
import { STORAGE_NAME } from "@/utils/BookCartLocalStorage";
import { BookCartListTemplate } from "@/components/templates/BookCartListTemplate";

export default async function Cart() {
  const cookieVal = (await cookies()).get(STORAGE_NAME)?.value ?? "[]";
  const bookIds: string[] = JSON.parse(cookieVal);

  return (
    <div>
      <BookCartListTemplate bookIds={bookIds}></BookCartListTemplate>
    </div>
  );
}
