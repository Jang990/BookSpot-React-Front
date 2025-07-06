import { Location } from "@/types/Location";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

interface CurrentLocationMarkerProps {
  currentLocation: Location;
}

export const CurrentLocationMarker = ({
  currentLocation,
}: CurrentLocationMarkerProps) => {
  return (
    <CustomOverlayMap
      position={{
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      }}
      yAnchor={0.5}
      xAnchor={0.5}
    >
      <div className="relative flex items-center justify-center">
        {/* 펄스 링 */}
        <div className="absolute w-10 h-10 bg-red-500/20 rounded-full animate-ping" />

        {/* 메인 마커 */}
        <div className="relative w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
      </div>
    </CustomOverlayMap>
  );
};
