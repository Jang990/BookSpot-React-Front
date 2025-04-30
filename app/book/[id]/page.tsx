import { BookDetail } from "@/components/organisms/BookDetail";
import { BookReviewList } from "@/components/organisms/BookReviewList";
type Params = { id: string };

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <BookDetail bookId={id} />

      <div className="mt-8">
        <BookReviewList bookId={id} />
      </div>
    </>
  );
}
