import { fetchPublicBookShelves } from "@/utils/api/BookshelfApi";

export default async function PublicBookShelvesListPage() {
  const shelves = (
    await fetchPublicBookShelves({
      pageable: { pageNumber: 0, pageSize: 12 },
      side: "server",
    })
  ).bookshelvesSummary;

  return <div>Hello World</div>;
}
