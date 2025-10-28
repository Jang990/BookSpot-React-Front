import { PublicBookshelvesListTemplate } from "@/components/templates/PublicBookshelvesListTemplate";
import { fetchPublicBookShelves } from "@/utils/api/BookshelfApi";

export const dynamic = "force-dynamic";

export default async function PublicBookShelvesListPage() {
  const shelves = (
    await fetchPublicBookShelves({
      pageable: { pageNumber: 0, pageSize: 30 },
      side: "server",
    })
  ).bookshelvesSummary;

  return <PublicBookshelvesListTemplate shelves={shelves} />;
}
