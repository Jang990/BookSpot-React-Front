import { useEffect, useMemo, useRef, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";
import { MapBound } from "@/types/MapBound";
import { LibraryStockMarker } from "../molecules/LibararyStockMarker";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { LibraryStockPanel } from "../molecules/LibraryStockPanel";
import { BookPreview } from "@/types/BookPreview";
import { Location } from "@/types/Location";
import { GpsButton } from "@/components/molecules/button/GpsButton";
import { CurrentLocationMarker } from "../molecules/CurrentLocationMarker";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS;
const kakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=clusterer`;

function kakaoMapScript(): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement("script");
  script.src = kakaoMapSrc;
  script.async = true;
  return script;
}

export interface MapLocationProps {
  location: Location;
  clusterdLevel: number;
}

export interface Props {
  booksInfo: BookPreview[];
  mapBound: MapBound;
  libraryMarkerInfos: LibraryMarkerInfo[];
  onBoundsChange: (bound: MapBound) => void;
  onError: () => void;
}

const EMPTY_FUNC = () => {};
const ANIMATION_DURATION = 250;

export const LibraryMap = ({
  booksInfo = [],
  mapBound,
  libraryMarkerInfos,
  onBoundsChange,
  onError = EMPTY_FUNC,
}: Props) => {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const [isEnteringPanel, setIsEnteringPanel] = useState(false);
  const [previousMarkerId, setPreviousMarkerId] = useState<string | null>(null);

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const mapRef = useRef<kakao.maps.Map | null>(null);

  // libraryMarkerInfos를 Map 형식으로 변환
  const libraryMarkerInfoMap = useMemo(() => {
    const map = new Map<string, LibraryMarkerInfo>();
    libraryMarkerInfos.forEach((info) => {
      map.set(info.library.id, info);
    });
    return map;
  }, [libraryMarkerInfos]);
  useEffect(() => {
    const script: HTMLScriptElement = kakaoMapScript();
    document.head.appendChild(script);
    script.addEventListener("load", () => setScriptLoad(true));
    script.addEventListener("error", () => onError());

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onError]);

  function kakaoMapScript(): HTMLScriptElement {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = kakaoMapSrc;
    script.async = true;
    return script;
  }

  const handleBoundsChanged = (map: any) => {
    // 지도 참조 저장
    mapRef.current = map;

    const bound = map.getBounds();
    const nw = bound.getNorthEast();
    const se = bound.getSouthWest();
    onBoundsChange(
      new MapBound(
        { latitude: nw.getLat(), longitude: nw.getLng() },
        { latitude: se.getLat(), longitude: se.getLng() },
        map.getLevel()
      )
    );

    // 중요: 여기서 패널 상태를 변경하지 않음
  };

  const handleMarkerClick = (libraryId: string) => {
    // 이미 선택된 마커를 다시 클릭한 경우
    if (selectedMarkerId === libraryId) {
      return;
    }

    // 이전 마커 ID 저장
    setPreviousMarkerId(selectedMarkerId);

    // 즉시 새 마커 선택 상태로 변경 (호버링 효과 즉시 적용)
    setSelectedMarkerId(libraryId);

    // 다른 마커가 이미 선택되어 있는 경우, 패널 애니메이션 처리
    animateLibraryPanel();

    function animateLibraryPanel() {
      // 처음 선택하는 경우
      if (!previousMarkerId) {
        setIsEnteringPanel(true);
        return;
      }

      // 기존 패널 사라지는 애니메이션
      setIsEnteringPanel(false);

      // 애니메이션 후 새 패널 표시
      setTimeout(() => {
        setIsEnteringPanel(true);
      }, ANIMATION_DURATION);
    }
  };

  function moveToLibraryLocation() {
    if (selectedMarkerId && mapRef.current) {
      const selectedLibrary = libraryMarkerInfoMap.get(selectedMarkerId);
      if (selectedLibrary) {
        const { latitude, longitude } = selectedLibrary.library.location;
        // 부드럽게 이동 (애니메이션 효과)
        mapRef.current.panTo(new window.kakao.maps.LatLng(latitude, longitude));
      }
    }
  }

  const handleClosePanel = () => {
    setIsEnteringPanel(false);

    // 애니메이션 후 선택 상태 초기화
    setTimeout(() => {
      setSelectedMarkerId(null);
      setPreviousMarkerId(null);
    }, ANIMATION_DURATION);
  };

  // 선택된 도서관 정보 가져오기
  const selectedLibraryInfo = useMemo(() => {
    return selectedMarkerId
      ? libraryMarkerInfoMap.get(selectedMarkerId) || null
      : null;
  }, [selectedMarkerId]);

  return (
    <div className="relative w-full">
      {!scriptLoad && <Loading />}
      {scriptLoad && (
        <div className="relative w-full">
          <GpsButton
            onError={onError}
            onClick={(latitude: number, longitude: number) => {
              if (!mapRef.current) return;
              const center = new kakao.maps.LatLng(latitude, longitude);
              setCurrentLocation({ latitude: latitude, longitude: longitude });
              mapRef.current.panTo(center); // 줌 레벨은 그대로
            }}
          />
          <KakaoMap
            center={{
              lat: mapBound.centerLatitude,
              lng: mapBound.centerLongitude,
            }}
            style={{
              width: "100%",
              height: "calc(100vh - 180px)",
              minHeight: "400px", // 최소 높이 설정
              maxWidth: "1200px",
              margin: "0 auto",
              borderRadius: "0.5rem",
            }}
            level={mapBound.clusterdLevel}
            onIdle={handleBoundsChanged}
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
                <LibraryStockMarker
                  key={libraryMarkerInfo.library.id}
                  libraryMarkerInfo={libraryMarkerInfo}
                  isHovered={hoveredMarkerId === libraryMarkerInfo.library.id}
                  isSelected={selectedMarkerId === libraryMarkerInfo.library.id}
                  onMouseOver={() =>
                    setHoveredMarkerId(libraryMarkerInfo.library.id)
                  }
                  onMouseOut={() => setHoveredMarkerId(null)}
                  onClick={() =>
                    handleMarkerClick(libraryMarkerInfo.library.id)
                  }
                />
              ))}
            </MarkerClusterer>
            {currentLocation && (
              <CurrentLocationMarker currentLocation={currentLocation} />
            )}

            {/* 선택된 도서관이 있을 때 지도 내에 패널 표시 */}
            {selectedLibraryInfo && (
              <LibraryStockPanel
                libraryMarkerInfo={selectedLibraryInfo}
                books={booksInfo}
                onClose={handleClosePanel}
                isEntering={isEnteringPanel}
                onMoveToLocation={moveToLibraryLocation}
              />
            )}
          </KakaoMap>
        </div>
      )}
    </div>
  );
};
