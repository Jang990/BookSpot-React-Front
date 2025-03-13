import { useCallback, useEffect, useState } from "react";
import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";
import { MapBound } from "@/types/MapBound";
import { LibraryMarker } from "../molecules/LibararyMarker";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { LibraryStockPanel } from "../molecules/LibraryStockPanel";

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
  const [selectedLibrary, setSelectedLibrary] =
    useState<LibraryMarkerInfo | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [isEnteringPanel, setIsEnteringPanel] = useState(false);

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

  const handleMarkerClick = (libraryMarkerInfo: LibraryMarkerInfo) => {
    // 이미 선택된 마커를 다시 클릭한 경우
    if (selectedMarkerId === libraryMarkerInfo.library.id) {
      return;
    }

    // 다른 마커가 이미 선택되어 있는 경우, 패널 애니메이션 처리
    if (selectedLibrary) {
      // 기존 패널 사라지는 애니메이션
      setIsEnteringPanel(false);

      // 애니메이션 후 새 패널 표시
      setTimeout(() => {
        setSelectedLibrary(libraryMarkerInfo);
        setSelectedMarkerId(libraryMarkerInfo.library.id);
        setIsEnteringPanel(true);
      }, 250); // 애니메이션 시간과 일치
    } else {
      // 처음 선택하는 경우
      setSelectedLibrary(libraryMarkerInfo);
      setSelectedMarkerId(libraryMarkerInfo.library.id);
      setIsEnteringPanel(true);
    }
  };

  const handleClosePanel = () => {
    setIsEnteringPanel(false);

    // 애니메이션 후 패널 제거 및 선택 상태 초기화
    setTimeout(() => {
      setSelectedLibrary(null);
      setSelectedMarkerId(null);
    }, 250); // 애니메이션 시간과 일치
  };

  return (
    <div className="relative">
      {!scriptLoad && <Loading />}
      {scriptLoad && (
        <div className="relative">
          <Map
            center={{ lat: 37.5081844, lng: 126.7241666 }}
            style={{
              width: "800px",
              height: "600px",
              margin: "0 auto",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
            level={clusterdLevel}
            onBoundsChanged={handleBoundsChanged}
            className="shadow-xl"
          >
            <MarkerClusterer
              averageCenter={true}
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
                  isSelected={selectedMarkerId === libraryMarkerInfo.library.id}
                  onMouseOver={() =>
                    setHoveredMarkerId(libraryMarkerInfo.library.id)
                  }
                  onMouseOut={() => setHoveredMarkerId(null)}
                  onClick={() => handleMarkerClick(libraryMarkerInfo)}
                />
              ))}
            </MarkerClusterer>

            {/* 선택된 도서관이 있을 때 지도 내에 패널 표시 */}
            {selectedLibrary && (
              <LibraryStockPanel
                libraryMarkerInfo={selectedLibrary}
                books={[
                  {
                    id: "162",
                    title: "팔로우 동유럽 :핵심 6개국",
                    author: "이주은,박주미 [공] 지음",
                    publicationYear: "",
                    publisher: "Travelike(트래블라이크)",
                  },
                ]}
                onClose={handleClosePanel}
                isEntering={isEnteringPanel}
              />
            )}
          </Map>
        </div>
      )}
    </div>
  );
};
