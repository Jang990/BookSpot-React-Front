import { Loader2, MapPin, X } from "lucide-react";
import { useState } from "react";
import { InfoToast } from "../toast/InfoToast";

interface GpsButtonProps {
  onClick: (latitude: number, longitude: number) => void;
}

export const GpsButton = ({ onClick }: GpsButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "WARN" } | null>(
    null
  );

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setToast({
        message: "GPS를 지원하지 않는 브라우저입니다.",
        type: "WARN",
      });

      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onClick(position.coords.latitude, position.coords.longitude);
        setIsLoading(false);
      },
      (error) => {
        setToast({ message: findErrorMessage(error), type: "WARN" });
        setIsLoading(false);

        function findErrorMessage(error: GeolocationPositionError): string {
          let errorMessage =
            "위치를 가져올 수 없습니다. 기기 설정과 인터넷 연결을 확인해주세요.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "위치 접근 권한이 거부되었습니다. 위치 권한을 허용해주세요.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "위치 정보를 사용할 수 없습니다. GPS를 켜주세요";
              break;
            case error.TIMEOUT:
              errorMessage =
                "위치 요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
              break;
          }
          return errorMessage;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <>
      <button
        onClick={handleGetCurrentLocation}
        disabled={isLoading}
        className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground p-2.5 rounded-full hover:bg-secondary/80 transition-colors animate-in zoom-in-50 duration-200 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        title="현재 위치로 이동"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <MapPin className="w-5 h-5" />
        )}
      </button>
      {toast && (
        <InfoToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};
