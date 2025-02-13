import Image from "next/image";
import Link from "next/link";

interface BookImageProps {
  id: string;
  title: string;
  image?: string;
}

export const BookPreviewImage = ({ id, title, image }: BookImageProps) => {
  return (
    <Link href={`/book/${id}`}>
      <div className="relative h-64 bg-muted">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Link>
  );
};
