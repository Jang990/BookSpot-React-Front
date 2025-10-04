"use client";

import {
  ModernDialog,
  ModernDialogContent,
  ModernDialogFooter,
} from "@/components/ui/custom-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Lock, Globe } from "lucide-react";
import { useBag } from "@/contexts/BagContext";
import { useEffect, useState } from "react";
import { fetchShelfBookStatus } from "@/utils/api/BookshelfApi";
import { ShelfBookStatus } from "@/types/ApiSpec";
import { addBookToShelves, removeBookToShelves } from "@/utils/api/ShelfBook";
import { useToast } from "@/contexts/ToastContext";

interface ShelfSelectListDialogProps {
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
  onClickNewShelf: () => void;
  onComplete: () => void;
}

export function ShelfSelectListDialog({
  bookId,
  isOpen,
  onClose,
  onClickNewShelf,
  onComplete,
}: ShelfSelectListDialogProps) {
  const { isInBag, addToBag, removeFromBag } = useBag();
  const { showToast } = useToast();

  const [bagChecked, setBagChecked] = useState(false);

  const [shelfStatus, setShelfStatus] = useState<ShelfBookStatus[]>([]);
  const [shelfSnapshot, setShelfSnapshot] = useState<ShelfBookStatus[]>([]);

  useEffect(() => {
    if (!bookId) return;

    setBagChecked(isInBag(bookId));

    fetchShelfBookStatus({ bookId, side: "client" }).then((data) => {
      setShelfStatus(data.shelves);
      setShelfSnapshot(data.shelves);
    });
  }, [bookId]);

  const toggleShelf = (id: string) => {
    setShelfStatus((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isExists: !s.isExists } : s))
    );
  };

  // 삭제된 책장 + 추가된 책장 뽑아내서 추가하기 + 책가방까지 생각
  const handleComplete = () => {
    const removedShelfIds = shelfSnapshot
      .filter(
        (s) => s.isExists && !shelfStatus.find((ls) => ls.id === s.id)?.isExists
      )
      .map((s) => s.id);

    const addedShelfIds = shelfStatus
      .filter(
        (s) =>
          !shelfSnapshot.find((is) => is.id === s.id)?.isExists && s.isExists
      )
      .map((s) => s.id);

    // TODO: Bulk Delete 기능 추가 | 책가방API, 책장도서삭제API, 책장도서추가API 모두 비동기임. 전부 비동기처리하고 전체가 완료되면 onClose, onComplted가 실행되게 만들어야함.
    // disabled 필요. => | bookCount가 리미트에 도달 + 책장에 책이 존재하지 않음(=넣기밖에 안됌) |
    // console.log("책이 삭제된 책장:", deletedShelfIds);
    // console.log("책이 추가된 책장:", addedShelfIds);
    addBookToShelves({
      bookId: bookId,
      targetShelfIds: addedShelfIds,
      side: "client",
    });

    removeBookToShelves({
      bookId: bookId,
      targetShelfIds: removedShelfIds,
      side: "client",
    });

    const bagSnapShot = isInBag(bookId);
    const isBagChanged = bagSnapShot !== bagChecked;
    if (isBagChanged && bagChecked) addToBag(bookId);
    if (isBagChanged && !bagChecked) removeFromBag(bookId);

    if (isBagChanged || addedShelfIds.length > 0 || removedShelfIds.length > 0)
      showToast("저장 작업을 성공적으로 마무리했습니다.", "INFO");

    onComplete();
    onClose();
  };

  return (
    <ModernDialog isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">책장 목록</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClickNewShelf}
              className="h-8 gap-1 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />새 책장
            </Button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ModernDialogContent className="max-h-[400px] overflow-y-auto py-0">
        <div className="space-y-1">
          <ShelfBookStatusCheckBox
            key={0}
            name="'책가방'에 저장"
            checked={bagChecked}
            isPublic={false}
            onClick={() => {
              setBagChecked(!bagChecked);
            }}
          />
          {shelfStatus.map((bookshelf) => (
            <ShelfBookStatusCheckBox
              key={bookshelf.id}
              name={bookshelf.name}
              isPublic={bookshelf.isPublic}
              checked={bookshelf.isExists}
              onClick={() => {
                toggleShelf(bookshelf.id);
              }}
            />
          ))}
        </div>
      </ModernDialogContent>

      <ModernDialogFooter>
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleComplete}>완료</Button>
      </ModernDialogFooter>
    </ModernDialog>
  );
}

interface ShelfBookStatusCheckBoxProp {
  checked: boolean;
  name: string;
  isPublic: boolean;
  onClick: () => void;
}

const ShelfBookStatusCheckBox = ({
  checked,
  name,
  isPublic,
  onClick,
}: ShelfBookStatusCheckBoxProp) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
    >
      <Checkbox checked={checked} className="pointer-events-none" />
      <span className="flex-1 text-sm font-medium text-foreground line-clamp-2">
        {name}
      </span>
      {isPublic ? (
        <Globe className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Lock className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
};
