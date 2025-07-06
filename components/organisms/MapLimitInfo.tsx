import { Info } from "lucide-react";

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

export const MapDetailLimitInfo = ({ detailLevel }: MapLimitInfoProps) => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
        <Info size={16} className="flex-shrink-0" />
        <span className="text-center">
          지도의 왼쪽 아래에 표시되는 거리 표시가{" "}
          {formatDistance(DISTANCE_METER[detailLevel - 2])} 이하일 때 소장 도서
          정보가 표시됩니다.
        </span>
      </div>
    </div>
  );
};
