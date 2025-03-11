import { useCallback, useEffect, useState } from "react";
import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";
import { MapBound } from "@/types/MapBound";
import { LibraryMarker } from "../molecules/LibararyMarker";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS;
const kakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=clusterer`;

function kakaoMapScript(): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement("script");
  script.src = kakaoMapSrc;
  script.async = true;
  return script;
}

export interface Props {
  clusterdLevel: number;
  libraryMarkerInfos: LibraryMarkerInfo[];
  onBoundsChange: (level: number, bound: MapBound) => void;
  onError: () => void;
}

const EMPTY_FUNC = () => {};

export const LibraryMap = ({
  clusterdLevel,
  libraryMarkerInfos,
  onBoundsChange,
  onError = EMPTY_FUNC,
}: Props) => {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

  useEffect(() => {
    const script: HTMLScriptElement = kakaoMapScript();
    document.head.appendChild(script);
    script.addEventListener("load", () => setScriptLoad(true));
    script.addEventListener("error", () => onError());
  }, []);

  const handleBoundsChanged = (map: kakao.maps.Map) => {
    const bound = map.getBounds();
    const nw = bound.getNorthEast();
    const se = bound.getSouthWest();
    onBoundsChange(map.getLevel(), {
      nw: { latitude: nw.getLat(), longitude: nw.getLng() },
      se: { latitude: se.getLat(), longitude: se.getLng() },
    });
  };

  return (
    <div>
      {!scriptLoad && <Loading />}
      {scriptLoad && (
        <Map
          center={{ lat: 37.5081844, lng: 126.7241666 }}
          style={{
            width: "800px",
            height: "600px",
            margin: "0 auto",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
          level={3}
          onBoundsChanged={handleBoundsChanged}
          className="shadow-xl"
        >
          <MarkerClusterer
            averageCenter={true}
            minLevel={clusterdLevel}
            disableClickZoom={false}
            styles={[
              {
                width: "50px",
                height: "50px",
                background: "rgba(22, 163, 74, 0.8)",
                borderRadius: "25px",
                color: "white",
                textAlign: "center",
                lineHeight: "50px",
                fontSize: "14px",
                fontWeight: "bold",
              },
            ]}
          >
            {libraryMarkerInfos.map((libraryMarkerInfo) => (
              <LibraryMarker
                key={libraryMarkerInfo.library.id}
                libraryMarkerInfo={libraryMarkerInfo}
                isHovered={hoveredMarkerId === libraryMarkerInfo.library.id}
                onMouseOver={() =>
                  setHoveredMarkerId(libraryMarkerInfo.library.id)
                }
                onMouseOut={() => setHoveredMarkerId(null)}
              />
            ))}
          </MarkerClusterer>
        </Map>
      )}
    </div>
  );
};
