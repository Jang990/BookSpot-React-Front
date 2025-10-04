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
  if (targetShelfIds.length == 0) return;

  const response = await getApiClient(side).post<void>(
    `/api/users/books/${bookId}/shelves`,
    {
      shelfIds: targetShelfIds,
    }
  );

  if (!response.ok) throw response.error;
};

export const removeBookToShelves = async ({
  bookId,
  targetShelfIds,
  side,
}: AddBookToShelvesProps): Promise<void> => {
  if (targetShelfIds.length == 0) return;

  const queryString = new URLSearchParams();
  queryString.append("shelfIds", targetShelfIds.join(","));

  const response = await getApiClient(side).delete<void>(
    `/api/users/books/${bookId}/shelves?${queryString.toString()}`
  );

  if (!response.ok) throw response.error;
};
