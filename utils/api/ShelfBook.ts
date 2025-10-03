import { getApiClient, Side } from "./common/Request";

export interface AddBookToShelvesRequest {
  shelfIds: string[];
}

interface AddBookToShelvesProps {
  bookId: string;
  targetShelfIds: string[];
  side: Side;
}

export const addBookToShelves = async ({
  bookId,
  targetShelfIds,
  side,
}: AddBookToShelvesProps): Promise<void> => {
  const response = await getApiClient(side).post<void>(
    `/api/users/books/${bookId}/shelves`,
    {
      shelfIds: targetShelfIds,
    }
  );

  if (!response.ok) throw response.error;
};
