const STORAGE_NAME = "SELECTED_BOOK_IDS";

export function findBookIds(): string[] {
  const stored = localStorage.getItem(STORAGE_NAME);
  return stored ? JSON.parse(stored) : [];
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
  localStorage.setItem(STORAGE_NAME, JSON.stringify(element));
}
