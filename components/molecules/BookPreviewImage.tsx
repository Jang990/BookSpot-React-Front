import Image from "next/image";
import { RankingBadge } from "../atoms/badge/RankingBadge";

interface BookImageProps {
  id: string;
  title: string | null;
  isbn13: string;
  rank: number | null;
  height?: "h-64" | "h-24";
  clickDisabled?: boolean;
}

export const BookPreviewImage = ({
  id,
  height = "h-64",
  title,
  isbn13,
  rank,
  clickDisabled = false,
}: BookImageProps) => {
  const imageUrl = `https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/${isbn13}.jpg`;
  const Wrapper = clickDisabled ? "div" : "a";
  return (
    // 그냥 a 태그로 쓰다가 div, a로 바꿈 => 나중에 그냥 클릭 이벤트로 바뀔 것이다
    <Wrapper
      {...(!clickDisabled && {
        target: "_blank",
        href: `https://search.kyobobook.co.kr/search?keyword=${isbn13}`,
      })}
      className="relative block"
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
    </Wrapper>
  );
};
