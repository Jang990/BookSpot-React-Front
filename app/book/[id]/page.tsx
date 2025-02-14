import Review from "@/components/molecules/Review";
import { BookDetail } from "@/components/organisms/BookDetail";
import { fetchBooksPreview } from "@/utils/api/BookPreviewApi";
import { BookReviewList } from "@/components/organisms/BookReviewList";

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

  return (
    <>
      <BookDetail bookId={id} />

      <div className="mt-8">
        <BookReviewList bookId={id} />
      </div>
    </>
  );
}
