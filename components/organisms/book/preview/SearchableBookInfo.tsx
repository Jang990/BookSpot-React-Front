"use client";

import { BagButton } from "@/components/atoms/button/icon/BagButton";
import { BookPreview } from "@/types/BookPreview";
import { BookInfo } from "./BookInfo";
import { IconTextButton } from "@/components/atoms/button/icon/CommonIconButton";
import { Backpack, Bookmark } from "lucide-react";

interface SearchableBookInfoProps {
  book: BookPreview;
  onClickAddBtn: (book: BookPreview) => void;
}

export const SearchableBookInfo = ({
  book,
  onClickAddBtn,
}: SearchableBookInfoProps) => {
  return (
    <BookInfo
      key={book.id}
      book={book}
      actionButton={
        <IconTextButton
          icon={<Bookmark className="w-4 h-4" />}
          onClick={() => onClickAddBtn(book)}
        >
          저장하기
        </IconTextButton>
      }
    />
  );
};
