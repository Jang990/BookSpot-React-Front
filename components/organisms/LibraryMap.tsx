import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { Loading } from "@/components/atoms/animation/Loading";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_JS;
const kakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

export const LibraryMap = () => {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = kakaoMapScript();
    document.head.appendChild(script);
    console.log(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });
  }, []);

  function kakaoMapScript(): HTMLScriptElement {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = kakaoMapSrc;
    script.async = true;
    return script;
  }
  return (
    <div>
      {scriptLoad ? (
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        ></Map>
      ) : (
        <Loading />
      )}
    </div>
  );
};
