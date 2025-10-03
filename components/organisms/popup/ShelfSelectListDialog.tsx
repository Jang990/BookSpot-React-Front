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

interface ShelfBookStatus {
  id: string;
  name: string;
  isPublic: boolean;
  isExists: boolean;
}

interface ShelfSelectListDialogProps {
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
  shelfBookStatus: ShelfBookStatus[];
  onBookshelfToggle: (id: string) => void;
  onCreateNew: () => void;
  onCancel: () => void;
  onComplete: () => void;
}

export function ShelfSelectListDialog({
  bookId,
  isOpen,
  onClose,
  shelfBookStatus,
  onBookshelfToggle,
  onCreateNew,
  onCancel,
  onComplete,
}: ShelfSelectListDialogProps) {
  const { isInBag } = useBag();

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
              onClick={onCreateNew}
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
            checked={isInBag(bookId)}
            isPublic={false}
            onClick={() => {
              console.log("책가방저장!");
            }}
          />
          {shelfBookStatus.map((bookshelf) => (
            <ShelfBookStatusCheckBox
              key={bookshelf.id}
              name={bookshelf.name}
              isPublic={bookshelf.isPublic}
              checked={bookshelf.isExists}
              onClick={() => {
                onBookshelfToggle(bookshelf.id);
              }}
            />
          ))}
        </div>
      </ModernDialogContent>

      <ModernDialogFooter>
        <Button variant="ghost" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onComplete}>완료</Button>
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
      <span className="flex-1 text-sm font-medium text-foreground">{name}</span>
      {isPublic ? (
        <Globe className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Lock className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
};
