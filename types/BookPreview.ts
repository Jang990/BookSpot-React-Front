import { BookCategory } from "./BookCategory";

export interface BookPreview {
  id: string;
  title: string | null;
  isbn13: string;
  createdAt: string;
  loanCount: number;
  author: string | null;
  publicationYear: string | null;
  publisher: string | null;

  category: BookCategory | null;
  rank: number | null;
}
