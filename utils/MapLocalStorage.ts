import { MapLocationProps } from "@/components/organisms/LibraryMap";

const STORAGE_NAME = "MAP_LOCATION";
const DEFAULT_MAP_LOCATION_PROPS: MapLocationProps = {
  location: { latitude: 37.566534, longitude: 126.9781931 },
  clusterdLevel: 3,
};

export function findMapLocationProps(): MapLocationProps {
  const stored = localStorage.getItem(STORAGE_NAME);
  return stored ? JSON.parse(stored) : DEFAULT_MAP_LOCATION_PROPS;
}

export function setMapLocationProps(locationProps: MapLocationProps): boolean {
  save(locationProps);
  return true;
}

function save(element: MapLocationProps) {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(element));
}
