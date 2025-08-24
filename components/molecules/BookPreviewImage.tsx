import Image from "next/image";
import Link from "next/link";
import { RankingBadge } from "../atoms/badge/RankingBadge";

interface BookImageProps {
  id: string;
  title: string;
  isbn13: string;
  rank: number | null;
}

export const BookPreviewImage = ({
  id,
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
      <div className="relative h-64 bg-muted">
        {rank && <RankingBadge rank={rank} />}
        <Image
          src={imageUrl}
          alt={title}
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
