import Image from "next/image";
import Link from "next/link";

interface BookImageProps {
  id: string;
  title: string;
  isbn13: string;
}

export const BookPreviewImage = ({ id, title, isbn13 }: BookImageProps) => {
  const imageUrl = `https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/${isbn13}.jpg`;
  return (
    <Link href={`/book/${id}`}>
      <div className="relative h-64 bg-muted">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
    </Link>
  );
};
