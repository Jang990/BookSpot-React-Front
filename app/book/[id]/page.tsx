import Review from "@/components/organisms/Review";
import { BookDetail } from "@/components/organisms/BookDetail";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";

async function getData() {
  const res = await fetch("https://api.example.com/...", { cache: "no-store" });
  fetchBooksPreview;
  // ISR 방식에서 revalidate: 0 옵션을 주는 것과 동일하다.
  // ex) fetch(URL, { next: { revalidate: 0 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type Params = { id: string };

export default async function BookDetailPage({ params }: { params: Params }) {
  const { id } = await params; // nextjs 15버전부터는 이렇게

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
      <BookDetail bookId={id} />

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
