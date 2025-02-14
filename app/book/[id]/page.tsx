import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Book } from "@/types/Book";
import { books } from "@/data/books";
import Image from "next/image";
import Review from "@/components/organisms/Review";
import { GetServerSideProps } from "next";
import { BookDetail } from "@/components/organisms/BookDetail";

interface BookDetailProps {
  hello: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { hello: "HelloWorld!" },
  };
};

export default function BookDetailPage({ hello }: BookDetailProps) {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const foundBook = books.find((b) => b.id === id);
    setBook(foundBook || null);
  }, [id]);

  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>;
  }

  // 예시 리뷰 데이터
  const reviews = [
    {
      author: "김독서",
      content: "정말 좋은 책이에요!",
      rating: 5,
      date: "2023-06-01",
    },
    {
      author: "이책벌레",
      content: "흥미로운 내용이었습니다.",
      rating: 4,
      date: "2023-05-28",
    },
  ];

  return (
    <>
      <BookDetail book={book} />

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-primary mb-4">리뷰</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => <Review key={index} {...review} />)
        ) : (
          <div className="bg-card shadow rounded-lg p-6">
            <p className="text-gray-700">
              현재 이 책에 대한 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
