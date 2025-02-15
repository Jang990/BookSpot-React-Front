import { BookDetail } from "@/components/organisms/BookDetail";
import { BookReviewList } from "@/components/organisms/BookReviewList";
type Params = { id: string };

export default async function BookDetailPage({ params }: { params: Params }) {
  const { id } = await params; // nextjs 15버전부터는 이렇게

  return (
    <>
      <BookDetail bookId={id} />

      <div className="mt-8">
        <BookReviewList bookId={id} />
      </div>
    </>
  );
}
