import { BookPreview } from "@/types/BookPreview";

export function convertBookPreview(content: any): BookPreview {
  return {
    id: content.id,
    title: content.title ?? "제목 없음",
    author: content.author ?? "Unknown",
    publicationYear: content.publicationYear ?? undefined,
    publisher: content.publisher ?? undefined,
  };
}
