"use client";

import Image from "next/image";
import { RankingBadge } from "../atoms/badge/RankingBadge";
import { ExternalLink, MapPinned } from "lucide-react";
import { IconTextButton } from "../atoms/button/icon/CommonIconButton";
import { useRouter } from "next/navigation";

interface BookImageProps {
  id: string;
  title: string | null;
  isbn13: string;
  rank: number | null;
  height?: "h-64" | "h-24";
  clickDisabled?: boolean;

  isHovered?: boolean;
  actionButton?: React.ReactNode;
}

export const BookPreviewImage = ({
  id,
  height = "h-64",
  title,
  isbn13,
  rank,
  isHovered = false,
  actionButton,
}: BookImageProps) => {
  const router = useRouter();
  const imageUrl = `https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/${isbn13}.jpg`;

  return (
    <div className="relative block">
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

      <div
        className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
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
        {/* <IconTextButton
          icon={<Bookmark className="w-4 h-4" />}
          onClick={() => console.log("저장하기 클릭")}
        >
          저장하기
        </IconTextButton> */}
      </div>
    </div>
  );
};
