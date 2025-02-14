"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Book } from "@/types/Book";
import { books } from "@/data/books";
import Image from "next/image";
import Review from "@/components/Review/Review";

export default function BookDetailPage() {
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
