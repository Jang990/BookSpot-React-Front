import { MapBound } from "@/types/MapBound";

const STORAGE_NAME = "MAP_LOCATION";

export const DEFAULT_MAP_BOUND: MapBound = new MapBound(
  {
    latitude: 37.57027567568552,
    longitude: 126.97290367316594,
  },
  {
    latitude: 37.56269646068594,
    longitude: 126.98268104389341,
  },
  3
);

export function findMapLocationProps(): MapBound {
  const cookieValue = getCookie(STORAGE_NAME);

  if (!cookieValue) return DEFAULT_MAP_BOUND;

  try {
    const parsed = JSON.parse(cookieValue);
    return parsed
      ? new MapBound(parsed.nw, parsed.se, parsed.clusterdLevel)
      : DEFAULT_MAP_BOUND;
  } catch (e) {
    console.error("Parsing error:", e);
    return DEFAULT_MAP_BOUND;
  }
}

export function setMapLocationProps(bound: MapBound): boolean {
  save(bound);
  return true;
}

function save(element: MapBound) {
  const value = JSON.stringify(element);
  // document.cookie = `${STORAGE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 7}`;
  document.cookie = `${STORAGE_NAME}=${encodeURIComponent(
    JSON.stringify({
      nw: element.nw,
      se: element.se,
      clusterdLevel: element.clusterdLevel, // 오타 고친 상태여야 함
    })
  )}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
