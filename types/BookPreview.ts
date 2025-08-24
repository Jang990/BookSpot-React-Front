import { BookCategory } from "./BookCategory";

export interface BookPreview {
  id: string;
  title: string;
  author: string;
  isbn13: string;
  publicationYear: string;
  publisher: string;
  loanCount: number;
  category: BookCategory;
  createdAt: string;
  image?: string;

  rank: number | null;
}
