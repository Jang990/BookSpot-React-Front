import { Location } from "@/types/Location";
import { MapMarker } from "react-kakao-maps-sdk";

interface CurrentLocationMarkerProps {
  currentLocation: Location;
}

export const CurrentLocationMarker = ({
  currentLocation,
}: CurrentLocationMarkerProps) => {
  return (
    <MapMarker
      position={{
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      }}
      image={{
        src: "data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='10' cy='10' r='8' fill='%23ef4444' stroke='white' stroke-width='2'/%3e%3c/svg%3e",
        size: { width: 20, height: 20 },
      }}
    />
  );
};
