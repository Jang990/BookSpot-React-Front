import { MapLocationProps } from "@/components/organisms/LibraryMap";

const STORAGE_NAME = "MAP_LOCATION";
const DEFAULT_MAP_LOCATION_PROPS: MapLocationProps = {
  location: { latitude: 37.566534, longitude: 126.9781931 },
  clusterdLevel: 3,
};

export function findMapLocationProps(): MapLocationProps {
  const cookieValue = getCookie(STORAGE_NAME);
  return cookieValue ? JSON.parse(cookieValue) : DEFAULT_MAP_LOCATION_PROPS;
}

export function setMapLocationProps(locationProps: MapLocationProps): boolean {
  save(locationProps);
  return true;
}

function save(element: MapLocationProps) {
  const value = JSON.stringify(element);
  document.cookie = `${STORAGE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 7}`;
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
