import { getApiClient } from "./common/Request";

const bagBookIdsApi = "/api/users/bag/books/ids";
const modifyBookInBagApi = (bookId: string) => `/api/users/bag/books/${bookId}`;
const clearBagApi = "/api/users/bag/books";

/**
 * 가방에 담긴 모든 책의 ID 목록을 조회합니다.
 * @returns {Promise<string[]>} 책 ID 문자열 배열
 */
export async function findBookIds(): Promise<string[]> {
  const response = await getApiClient("client").get<string[]>(bagBookIdsApi);

  if (!response.ok) {
    throw response.error;
  }

  if (response.data) return response.data;
  else return [];
}

/**
 * 특정 책을 가방에 추가합니다.
 * @param {string} bookId - 추가할 책의 ID
 * @returns {Promise<boolean>} 성공 여부
 */
export async function addBookId(bookId: string): Promise<boolean> {
  const response = await getApiClient("client").post(
    modifyBookInBagApi(bookId)
  );

  if (!response.ok) {
    throw response.error;
  }

  return response.ok;
}

/**
 * 특정 책을 가방에서 제거합니다.
 * @param {string} bookId - 제거할 책의 ID
 * @returns {Promise<boolean>} 성공 여부
 */
export async function removeBookId(bookId: string): Promise<boolean> {
  const response = await getApiClient("client").delete(
    modifyBookInBagApi(bookId)
  );

  if (!response.ok) {
    throw response.error;
  }

  return response.ok;
}

/**
 * 가방에 담긴 모든 책을 제거합니다.
 * @returns {Promise<boolean>} 성공 여부
 */
export async function clear(): Promise<boolean> {
  const response = await getApiClient("client").delete(clearBagApi);

  if (!response.ok) {
    throw response.error;
  }

  return response.ok;
}
