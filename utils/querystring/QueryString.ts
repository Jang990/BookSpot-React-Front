export function toRawQueryString(
  searchParams: Record<string, string | string[] | undefined>
): string {
  const queryObject = Object.entries(searchParams).reduce(
    (acc, [key, val]) => {
      if (typeof val === "string") {
        acc[key] = val;
      } else if (Array.isArray(val)) {
        acc[key] = val[0] ?? "";
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const qs = new URLSearchParams(queryObject).toString();

  // ex) "searchTerm=한강&page=..."
  return qs ? `${qs}` : "";
}

export function parseNumber(
  queryStrings: {
    [key: string]: string | string[] | undefined;
  },
  key: string
): number | null {
  const rawPage = queryStrings[key];
  if (!rawPage || Array.isArray(rawPage) || Number.isNaN(rawPage)) return null;

  return Number.parseInt(rawPage, 10);
}
