import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { Map as KakaoMap, MarkerClusterer } from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";
import { MapBound } from "@/types/MapBound";
import LibraryMarkerInfo from "@/types/LibraryMarkerInfo";
import { Location } from "@/types/Location";
import { GpsButton } from "@/components/molecules/button/GpsButton";
import { CurrentLocationMarker } from "@/components/molecules/CurrentLocationMarker";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS;
const kakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=clusterer`;

function kakaoMapScript(): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement("script");
  script.src = kakaoMapSrc;
  script.async = true;
  return script;
}

export interface BaseLibraryMapProps {
  mapBound: MapBound;
  libraryMarkerInfos: LibraryMarkerInfo[];
  onBoundsChange: (bound: MapBound) => void;
  onError?: () => void;

  /** 마커 컴포넌트 주입 (LibraryMarker, LibraryStockMarker 등) */
  renderMarker: (params: {
    libraryMarkerInfo: LibraryMarkerInfo;
    isHovered: boolean;
    isSelected: boolean;
    onMouseOver: () => void;
    onMouseOut: () => void;
    onClick: () => void;
  }) => ReactNode;

  /** 패널 주입 */
  renderPanel?: (params: {
    selectedLibraryInfo: LibraryMarkerInfo;
    isEntering: boolean;
    onClose: () => void;
    onMoveToLocation: () => void;
  }) => ReactNode;
}

const EMPTY_FUNC = () => {};
const ANIMATION_DURATION = 250;

export const BaseLibraryMap = ({
  mapBound,
  libraryMarkerInfos,
  onBoundsChange,
  onError = EMPTY_FUNC,
  renderMarker,
  renderPanel,
}: BaseLibraryMapProps) => {
  const [scriptLoad, setScriptLoad] = useState(false);

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

  const handleBoundsChanged = (map: any) => {
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
  };

  const handleMarkerClick = (libraryId: string) => {
    if (selectedMarkerId === libraryId) return;

    setPreviousMarkerId(selectedMarkerId);
    setSelectedMarkerId(libraryId);

    animateLibraryPanel();
  };

  function animateLibraryPanel() {
    if (!previousMarkerId) {
      setIsEnteringPanel(true);
      return;
    }

    setIsEnteringPanel(false);
    setTimeout(() => setIsEnteringPanel(true), ANIMATION_DURATION);
  }

  function moveToLibraryLocation() {
    if (selectedMarkerId && mapRef.current) {
      const selectedLibrary = libraryMarkerInfoMap.get(selectedMarkerId);
      if (selectedLibrary) {
        const { latitude, longitude } = selectedLibrary.library.location;
        mapRef.current.panTo(new window.kakao.maps.LatLng(latitude, longitude));
      }
    }
  }

  const handleClosePanel = () => {
    setIsEnteringPanel(false);
    setTimeout(() => {
      setSelectedMarkerId(null);
      setPreviousMarkerId(null);
    }, ANIMATION_DURATION);
  };

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
            onClick={(latitude: number, longitude: number) => {
              setCurrentLocation({ latitude, longitude });
              if (!mapRef.current) return;
              const center = new kakao.maps.LatLng(latitude, longitude);
              mapRef.current.panTo(center);
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
              minHeight: "400px",
              maxWidth: "1200px",
              margin: "0 auto",
              borderRadius: "0.5rem",
            }}
            level={mapBound.clusterdLevel}
            onIdle={handleBoundsChanged}
            onCreate={(map) => (mapRef.current = map)}
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
              {libraryMarkerInfos.map((libraryMarkerInfo) =>
                renderMarker({
                  libraryMarkerInfo,
                  isHovered: hoveredMarkerId === libraryMarkerInfo.library.id,
                  isSelected: selectedMarkerId === libraryMarkerInfo.library.id,
                  onMouseOver: () =>
                    setHoveredMarkerId(libraryMarkerInfo.library.id),
                  onMouseOut: () => setHoveredMarkerId(null),
                  onClick: () =>
                    handleMarkerClick(libraryMarkerInfo.library.id),
                })
              )}
            </MarkerClusterer>

            {currentLocation && (
              <CurrentLocationMarker currentLocation={currentLocation} />
            )}

            {selectedLibraryInfo &&
              renderPanel?.({
                selectedLibraryInfo,
                isEntering: isEnteringPanel,
                onClose: handleClosePanel,
                onMoveToLocation: moveToLibraryLocation,
              })}
          </KakaoMap>
        </div>
      )}
    </div>
  );
};
