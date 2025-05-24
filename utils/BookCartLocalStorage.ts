export const STORAGE_NAME = "SELECTED_BOOK_IDS";

export function findBookIds(): string[] {
  const cookieValue = getCookie(STORAGE_NAME);
  return cookieValue ? JSON.parse(cookieValue) : [];
}

export function addBookId(bookId: string): boolean {
  const cart = findBookIds();
  if (cart.includes(bookId)) return false;

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
  document.cookie = `${STORAGE_NAME}=${JSON.stringify(element)}; path=/`;
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}
