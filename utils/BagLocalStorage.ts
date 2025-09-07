// @/utils/BagCookie.ts

export const MAX_BAG_SIZE = 5;
export const BAG_EXPIRED_MONTH = 6;
export const STORAGE_NAME = "SELECTED_BOOK_IDS";

export async function findBookIds(): Promise<string[]> {
  if (typeof document === "undefined") {
    return Promise.resolve([]);
  }
  const cookieValue = getCookie(STORAGE_NAME);
  const result = cookieValue ? JSON.parse(cookieValue) : [];
  return Promise.resolve(result);
}

export async function addBookId(bookId: string): Promise<boolean> {
  const cart = await findBookIds();
  if (cart.length === MAX_BAG_SIZE) {
    throw new Error("책가방이 가득 찼습니다.");
  }
  if (cart.includes(bookId)) {
    throw new Error("책가방에 이미 존재하는 책입니다.");
  }

  cart.push(bookId);
  save(cart);
  return Promise.resolve(true);
}

export async function removeBookId(bookId: string): Promise<boolean> {
  const cart = await findBookIds();
  if (!cart.includes(bookId)) {
    return Promise.resolve(false);
  }

  save(cart.filter((selected) => selected !== bookId));
  return Promise.resolve(true);
}

export async function clear(): Promise<void> {
  save([]);
  return Promise.resolve();
}

function save(element: string[]) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + BAG_EXPIRED_MONTH);
  document.cookie = `${STORAGE_NAME}=${JSON.stringify(
    element
  )}; path=/; expires=${expires.toUTCString()}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}
