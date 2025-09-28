import type { BookPreview } from "@/types/BookPreview";
import type { Bookshelf, BookshelfSummary } from "@/types/Bookshelf";

export const mockBooks: BookPreview[] = [
  {
    id: "1",
    title: "클린 코드",
    isbn13: "9788966260959",
    createdAt: "2024-01-15",
    loanCount: 1250,
    author: "로버트 C. 마틴",
    publicationYear: "2013",
    publisher: "인사이트",
    category: { id: 1, name: "프로그래밍" },
    rank: null,
  },
  {
    id: "2",
    title: "이펙티브 자바",
    isbn13: "9788966262281",
    createdAt: "2024-01-20",
    loanCount: 980,
    author: "조슈아 블로크",
    publicationYear: "2018",
    publisher: "인사이트",
    category: { id: 1, name: "프로그래밍" },
    rank: null,
  },
  {
    id: "3",
    title: "리팩터링",
    isbn13: "9791162242742",
    createdAt: "2024-02-01",
    loanCount: 750,
    author: "마틴 파울러",
    publicationYear: "2019",
    publisher: "한빛미디어",
    category: { id: 1, name: "프로그래밍" },
    rank: null,
  },
  {
    id: "4",
    title: "데미안",
    isbn13: "9788937460449",
    createdAt: "2024-02-10",
    loanCount: 2100,
    author: "헤르만 헤세",
    publicationYear: "2009",
    publisher: "민음사",
    category: { id: 2, name: "소설" },
    rank: null,
  },
  {
    id: "5",
    title: "1984",
    isbn13: "9788937460777",
    createdAt: "2024-02-15",
    loanCount: 1800,
    author: "조지 오웰",
    publicationYear: "2003",
    publisher: "민음사",
    category: { id: 2, name: "소설" },
    rank: null,
  },
];

export const mockBookshelves: Bookshelf[] = [
  {
    id: "shelf-1",
    name: "개발 필독서",
    createdAt: "2024-01-01",
    isPublic: true,
    bookCount: 4,
    books: mockBooks.slice(0, 3),
  },
  {
    id: "shelf-2",
    name: "고전 문학",
    createdAt: "2024-01-05",
    isPublic: false,
    bookCount: 3,
    books: mockBooks.slice(3, 5),
  },
  {
    id: "shelf-3",
    name: "읽고 싶은 책들",
    createdAt: "2024-02-01",
    isPublic: false,
    bookCount: 0,
    books: [],
  },
];

export const getBookshelfSummaries = (): BookshelfSummary[] => {
  return mockBookshelves.map((shelf) => ({
    id: shelf.id,
    name: shelf.name,
    bookCount: shelf.books.length,
    createdAt: shelf.createdAt,
    isPublic: shelf.isPublic,
    thumbnailIsbns: shelf.books.map((b) => b.id).slice(0, 4),
  }));
};
