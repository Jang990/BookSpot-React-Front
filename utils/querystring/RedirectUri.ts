export const REDIRECT_QUERY_STRING_KEY = "redirectUri";

export function parseRedirectUri(queryStrings: {
  [key: string]: string | undefined;
}): string {
  return queryStrings[REDIRECT_QUERY_STRING_KEY] ?? "/";
}
