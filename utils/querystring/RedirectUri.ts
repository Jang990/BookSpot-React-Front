export const REDIRECT_QUERY_STRING_KEY = "redirectUri";

export function parseRedirectUri(queryStrings: {
  [key: string]: string | undefined;
}): string {
  return queryStrings[REDIRECT_QUERY_STRING_KEY] ?? "/";
}

export function createRedirectLoginUrl(currentUri?: string): string {
  if (currentUri)
    return `/login?${REDIRECT_QUERY_STRING_KEY}=${encodeURIComponent(currentUri)}`;
  return "/login";
}

export function createLoginUrl_CSR(): string {
  const { pathname, search } = window.location;
  const currentUri = pathname + search;
  return createRedirectLoginUrl(currentUri);
}
