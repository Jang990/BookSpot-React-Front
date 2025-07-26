import { Info } from "lucide-react";
import { InfoPanel } from "../molecules/InfoPanel";

interface MapLimitInfoProps {
  detailLevel: number;
}

const DISTANCE_METER = [20, 30, 50, 100, 250, 500, 1000, 2000, 4000, 8000];
function formatDistance(meter: number): string {
  if (meter >= 1000) {
    return meter / 1000 + " km";
  }
  return meter + " m";
}

export const MapLimitInfo = ({ detailLevel }: MapLimitInfoProps) => {
  return (
    <InfoPanel
      text={`지도의 왼쪽 아래에 표시되는 거리 표시가
          "${formatDistance(DISTANCE_METER[detailLevel - 2])}" 이하일 때 소장 도서
          정보가 표시됩니다.`}
    />
  );
};
