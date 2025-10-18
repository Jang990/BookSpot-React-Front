"use client";

import { BookPreview } from "@/types/BookPreview";
import { useEffect, useState } from "react";
import { Backpack } from "lucide-react";
import { DeletablaBookInfo } from "@/components/organisms/book/preview/DeletableBookInfo";
import { useBag } from "@/contexts/BagContext";
import { BookBagPopup } from "../organisms/BookBagPopup";
import { InfoPanel } from "../molecules/InfoPanel";
import { Pageable } from "@/types/Pageable";
import {
  findBooksPreview,
  findBooksPreviewWithIds,
} from "@/utils/api/BookPreviewApi";
import { MAX_BAG_SIZE } from "@/utils/BagLocalStorage";
import { SkeletonBookList } from "../organisms/SkeletonBookList";
import { ErrorPage } from "../molecules/ErrorPage";
import { SkeletonDiv } from "../atoms/SkeletonDiv";
import { useToast } from "@/contexts/ToastContext";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderSubLabel,
  PageHeaderTitle,
} from "../ui/custom-page-title";

interface Props {}

const FIRST_PAGE = 0;
const BAG_PAGEABLE: Pageable = {
  pageNumber: FIRST_PAGE,
  pageSize: MAX_BAG_SIZE,
};

export const BookBagListTemplate = ({}: Props) => {
  const { bag, isLoading, removeFromBag } = useBag();
  const [books, setBooks] = useState<BookPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { showToast } = useToast(); // useToast 훅 사용

  useEffect(() => {
    if (isLoading) return;
    if (bag.length === 0) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    findBooksPreviewWithIds({ bookIds: bag, side: "client" })
      .then((books) => setBooks(books))
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, [isLoading]);

  const handleRemoveBook = (book: BookPreview) => {
    removeFromBag(book.id)
      .then((isSuccess) => {
        if (!isSuccess) throw new Error();
        setBooks(books.filter((b) => b.id !== book.id));
        showToast(`'${book.title}'이(가) 제거되었습니다.`, "INFO");
      })
      .catch((err) => {
        showToast("알 수 없는 오류가 발생했습니다.", "WARN");
      });
  };

  return isError ? (
    <ErrorPage />
  ) : (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader>
          <PageHeaderTitle>내 가방</PageHeaderTitle>
          <PageHeaderActions>
            {loading ? (
              <SkeletonDiv height="h-5" width="w-28" />
            ) : (
              <PageHeaderSubLabel>
                담은 책 : {books.length} / {MAX_BAG_SIZE}
              </PageHeaderSubLabel>
            )}
          </PageHeaderActions>
        </PageHeader>
      </div>
      <div>
        {loading && <SkeletonBookList />}
        {!loading && !isError && books.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12">
            <Backpack size={96} className="text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              책가방이 비어있습니다.
            </p>
          </div>
        )}
        {!loading && !isError && books.length !== 0 && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {books.length !== 0 && (
              <>
                {books.map((book) => (
                  <DeletablaBookInfo
                    key={book.id}
                    book={book}
                    deleteBook={handleRemoveBook}
                  ></DeletablaBookInfo>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div className="pt-3">
        {bag.length > 0 && <BookBagPopup></BookBagPopup>}
      </div>
      <div className="pt-3">
        <InfoPanel text="원하는 책을 찾아 책가방에 담고, ‘도서관 찾기’ 버튼을 눌러 소장 여부를 확인해 보세요." />
      </div>
    </div>
  );
};
