import type { Library } from "@/types/Library";

export const libraries: Library[] = [
  {
    id: "1",
    name: "부평구립갈산도서관",
    distance: 1.2,
    books: ["1", "3", "5"],
  },
  {
    id: "2",
    name: "부평구립삼산도서관",
    distance: 2.5,
    books: ["2", "4", "5"],
  },
  {
    id: "3",
    name: "인천광역시교육청부평도서관",
    distance: 3.8,
    books: ["1", "2", "3", "4", "5"],
  },
  {
    id: "4",
    name: "인천광역시교육청북구도서관",
    distance: 4.2,
    books: ["1", "2", "4"],
  },
  {
    id: "5",
    name: "부평구립청천도서관",
    distance: 5.0,
    books: ["3", "5"],
  },
  {
    id: "6",
    name: "미추홀도서관",
    distance: 6.3,
    books: ["1", "2", "3", "4", "5"],
  },
];
