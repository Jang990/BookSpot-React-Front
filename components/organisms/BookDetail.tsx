import { fetchBooksDetail } from "@/utils/api/BookDetailApi";
import Image from "next/image";

interface Props {
  bookId: string;
}

export const BookDetail = async ({ bookId }: Props) => {
  const book = await fetchBooksDetail(bookId);

  return (
    <div className="bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            className="h-96 w-full object-cover md:w-64"
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            width={256}
            height={384}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-primary font-semibold">
            {book.category}
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            {book.title}
          </h2>
          <p className="mt-2 text-gray-500">{book.author}</p>
          <p className="mt-2 text-gray-500">
            {book.year} · {book.publisher}
          </p>
          <p className="mt-2 text-gray-500">ISBN: {book.isbn}</p>
          <p className="mt-4 text-gray-700">
            책 상세 정보가 여기에 들어갑니다. 현재 데이터에는 없지만, 실제
            애플리케이션에서는 이 부분에 책의 상세한 설명이 들어갈 것입니다.
          </p>
          <p className="mt-2 text-gray-500">페이지 수: 300 (예시)</p>
        </div>
      </div>
    </div>
  );
};
