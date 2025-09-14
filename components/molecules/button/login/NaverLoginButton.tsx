"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  onClick?: () => void;
}

export const NaverLoginButton = ({ onClick = () => {} }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 relative rounded-xl overflow-hidden bg-[#03C75A]"
    >
      <Image
        src="/Naver_Login.png"
        alt="네이버 로그인"
        fill
        className="object-contain"
        unoptimized
        priority
      />
    </button>
  );
};
