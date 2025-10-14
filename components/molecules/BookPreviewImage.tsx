"use client";

import Image from "next/image";
import { RankingBadge } from "../atoms/badge/RankingBadge";
import { ExternalLink, MapPinned } from "lucide-react";
import { IconTextButton } from "../atoms/button/icon/CommonIconButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookImageProps {
  id: string;
  title: string | null;
  isbn13: string;
  rank: number | null;
  height?: "h-64" | "h-24";
  clickDisabled?: boolean;

  disabledClick?: boolean;
  actionButton?: React.ReactNode;
}

export const BookPreviewImage = ({
  id,
  height = "h-64",
  title,
  isbn13,
  rank,
  disabledClick = false,
  actionButton,
}: BookImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const imageUrl = `https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/${isbn13}.jpg`;

  return (
    <div
      className="relative block"
      onMouseEnter={() => !disabledClick && setIsHovered(true)}
      onMouseLeave={() => !disabledClick && setIsHovered(false)}
    >
      <div className={`relative bg-muted ${height ?? "h-64"}`}>
        {rank && <RankingBadge rank={rank} />}
        <Image
          src={imageUrl}
          alt={title ?? "교보문고 페이지로 이동"}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain"
          unoptimized
          title="교보문고 페이지로 이동"
        />
      </div>

      {!disabledClick && (
        <div
          className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 ${
            isHovered
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <IconTextButton
            icon={<ExternalLink className="w-4 h-4" />}
            onClick={() =>
              window.open(
                `https://search.kyobobook.co.kr/search?keyword=${isbn13}`,
                "_blank"
              )
            }
          >
            상세보기
          </IconTextButton>
          <IconTextButton
            icon={<MapPinned className="w-4 h-4" />}
            onClick={() => router.push(`/libraries/stock/search?bookIds=${id}`)}
          >
            위치찾기
          </IconTextButton>
          {actionButton}
        </div>
      )}
    </div>
  );
};
