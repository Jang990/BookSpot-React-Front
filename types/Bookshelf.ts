export const MAX_SHELF_NAME_LENGTH = 50;
export const MAX_USER_SHELF_SIZE = 10;
export const MAX_SHELF_BOOK_COUNT = 50;

export interface CommonShelf {
  id: string;
  name: string;
  bookCount: number;
  createdAt: string;
  isPublic: boolean;
}

export interface BookshelfSummary extends CommonShelf {
  thumbnailImageIsbn: string[]; // 최대 4개의 책 표지를 보여주기 위한 배열
}

export interface ShelfCreationRequest {
  name: string;
  isPublic: boolean;
}
