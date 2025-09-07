import { cookies } from "next/headers";
import { STORAGE_NAME } from "@/utils/BagLocalStorage";
import { BookBagListTemplate } from "@/components/templates/BookBagListTemplate";

export default async function Cart() {
  return (
    <div>
      <BookBagListTemplate></BookBagListTemplate>
    </div>
  );
}
