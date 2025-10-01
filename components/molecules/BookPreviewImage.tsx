import Image from "next/image";
import { RankingBadge } from "../atoms/badge/RankingBadge";

interface BookImageProps {
  id: string;
  height?: "h-64" | "h-24";
  title: string | null;
  isbn13: string;
  rank?: number | null;
}

export const BookPreviewImage = ({
  id,
  height,
  title,
  isbn13,
  rank,
}: BookImageProps) => {
  const imageUrl = `https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/${isbn13}.jpg`;
  return (
    <a
      target="_blank"
      href={`https://search.kyobobook.co.kr/search?keyword=${isbn13}`}
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
    </a>
  );
};
