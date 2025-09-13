"use client";
import Image from "next/image";

interface Props {
  onClick?: () => void;
}

export const KakaoLoginButton = ({ onClick = () => {} }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 relative rounded-xl overflow-hidden bg-[#FEE500]"
    >
      <Image
        src="/Kakao_Login.png"
        alt="카카오 로그인"
        fill
        className="object-contain"
        unoptimized
        priority
      />
    </button>
  );
};
