import { BookPreview } from "./BookPreview";

export interface BookshelfSummary {
  id: string;
  name: string;
  bookCount: number;
  createdAt: string;
  isPublic: boolean;
  thumbnailIsbns: string[]; // 최대 4개의 책 표지를 보여주기 위한 배열
}

export interface Bookshelf {
  id: string;
  name: string;
  bookCount: number;
  createdAt: string;
  isPublic: boolean;
  books: BookPreview[];
}
