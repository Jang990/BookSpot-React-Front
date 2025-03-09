import { useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { MapBound } from "@/types/MapBound";
import { Library } from "@/types/Library";
import { LibraryMarker } from "../molecules/LibararyMarker";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS;
const kakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=clusterer`;

function kakaoMapScript(): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement("script");
  script.src = kakaoMapSrc;
  script.async = true;
  return script;
}

interface Props {
  libraries: Library[];
  onBoundsChange: (bound: MapBound) => void;
}

export const LibraryMap = ({ libraries, onBoundsChange }: Props) => {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [scriptLoadError, setScriptLoadError] = useState<boolean>(false);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);

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

  const handleClusteringComplete = () => {};

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {scriptLoadError && <div>잘못된 스크립트 오류입니다.</div>}
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
              minLevel={7}
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
              {libraries.map((library) => (
                <LibraryMarker
                  key={library.id}
                  library={library}
                  isHovered={hoveredMarkerId === library.id}
                  onMouseOver={() => setHoveredMarkerId(library.id)}
                  onMouseOut={() => setHoveredMarkerId(null)}
                />
              ))}
            </MarkerClusterer>
          </Map>
        )}
      </div>
    </div>
  );
};
