export const SEARCH_HISTORY_MAX_LENGTH = 5;
export const SEARCH_HISTORY_COOKIE_NAME = "SEARCH_HISTORY";
export const SEARCH_HISTORY_EXPIRE_MONTH = 6;

export async function getHistory(): Promise<string[]> {
  if (typeof document === "undefined") return [];
  const cookieValue = getCookie(SEARCH_HISTORY_COOKIE_NAME);
  return cookieValue ? JSON.parse(cookieValue) : [];
}

export async function addHistory(term: string): Promise<void> {
  if (typeof document === "undefined") return;
  term = term.trim();
  if (!term) return;

  const history = await getHistory();
  const filtered = history.filter((item) => item !== term);
  const updated = [...filtered, term];
  if (updated.length > SEARCH_HISTORY_MAX_LENGTH) updated.shift();
  saveHistory(updated);
}

export async function removeHistory(term: string): Promise<void> {
  if (typeof document === "undefined") return;
  const history = await getHistory();
  const updated = history.filter((item) => item !== term);
  saveHistory(updated);
}

function saveHistory(history: string[]) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + SEARCH_HISTORY_EXPIRE_MONTH);
  document.cookie = `${SEARCH_HISTORY_COOKIE_NAME}=${JSON.stringify(
    history
  )}; path=/; expires=${expires.toUTCString()}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}
