import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { MapBound } from "@/types/MapBound";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS;
const kakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

function kakaoMapScript(): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement("script");
  script.src = kakaoMapSrc;
  script.async = true;
  return script;
}

interface Props {
  onBoundsChange: (bound: MapBound) => void;
}

export const LibraryMap = ({ onBoundsChange }: Props) => {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [scriptLoadError, setScriptLoadError] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = kakaoMapScript();
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });
    script.addEventListener("error", () => {
      setScriptLoadError(true);
    });
  }, []);

  const handleBoundsChanged = (map: kakao.maps.Map) => {
    const bound = map.getBounds();
    const nw = bound.getNorthEast();
    const se = bound.getSouthWest();
    onBoundsChange({
      nw: { latitude: nw.getLat(), longitude: nw.getLng() },
      se: { latitude: se.getLat(), longitude: se.getLng() },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {scriptLoadError && <div>잘못된 스크립트 오류입니다.</div>}
        {!scriptLoad && <Loading />}

        {scriptLoad && (
          <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "800px", height: "600px" }}
            level={3}
            onBoundsChanged={handleBoundsChanged}
          ></Map>
        )}
      </div>
    </div>
  );
};
