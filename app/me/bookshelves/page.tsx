import { UserBookshelvesListTemplate } from "@/components/templates/UserBookshelvesListTemplate";
import { fetchUserBookshelvesSummary } from "@/utils/api/BookshelfApi";

export default async function BookshelvesPage() {
  const shelves = (
    await fetchUserBookshelvesSummary({
      userId: "1",
      side: "client",
    })
  ).bookshelvesSummary;

  return (
    <UserBookshelvesListTemplate
      shelves={shelves}
    ></UserBookshelvesListTemplate>
  );
}
