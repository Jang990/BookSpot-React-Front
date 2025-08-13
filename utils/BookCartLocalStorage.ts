export const MAX_CART_SIZE = 20;
export const CART_EXPIRED_MONTH = 6;
export const STORAGE_NAME = "SELECTED_BOOK_IDS";

export function findBookIds(): string[] {
  const cookieValue = getCookie(STORAGE_NAME);
  return cookieValue ? JSON.parse(cookieValue) : [];
}

export function addBookId(bookId: string): boolean {
  const cart = findBookIds();
  if (cart.length === MAX_CART_SIZE) throw new Error("북카트가 가득 찼습니다.");
  if (cart.includes(bookId))
    throw new Error("북카트에 이미 존재하는 책입니다.");

  cart.push(bookId);
  save(cart);
  return true;
}

export function removeBookId(bookId: string): boolean {
  const cart = findBookIds();
  if (!cart.includes(bookId)) return false;

  save(cart.filter((selected) => selected !== bookId));
  return true;
}

export function clear(): void {
  save([]);
}

function save(element: string[]) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + CART_EXPIRED_MONTH);
  document.cookie = `${STORAGE_NAME}=${JSON.stringify(element)}; path=/; expires=${expires.toUTCString()}`;
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}
