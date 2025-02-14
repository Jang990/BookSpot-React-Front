import Review from "../molecules/Review";

interface Props {
  bookId: string;
}

export async function BookReviewList({ bookId }: Props) {
  // TODO : 추후 bookId를 통한 SSR 진행
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
    <div>
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
  );
}
