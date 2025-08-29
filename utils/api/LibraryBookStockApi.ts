interface Props {
  libraryId: string;
  bookIds: string[];
}

export function createApi({ libraryId, bookIds }: Props): string {
  const STOCK_API_URL =
    process.env.NEXT_PUBLIC_FRONT_SERVER_URL +
    `/api/libraries/${libraryId}/stocks/loan`;

  const url = new URL(STOCK_API_URL);
  url.searchParams.append("bookIds", bookIds.join(","));

  return url.toString();
}
