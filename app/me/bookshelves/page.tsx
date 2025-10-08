import { UserBookshelvesListTemplate } from "@/components/templates/UserBookshelvesListTemplate";
import { fetchUserBookshelvesSummary } from "@/utils/api/BookshelfApi";

export const dynamic = "force-dynamic";

export default async function BookshelvesPage() {
  const shelves = (
    await fetchUserBookshelvesSummary({
      userId: "1",
      side: "server",
    })
  ).bookshelvesSummary;

  return (
    <UserBookshelvesListTemplate
      shelves={shelves}
    ></UserBookshelvesListTemplate>
  );
}
