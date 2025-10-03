"use client";

import {
  ModernDialog,
  ModernDialogContent,
  ModernDialogFooter,
} from "@/components/ui/custom-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Lock, Globe } from "lucide-react";

interface ShelfBookStatus {
  id: string;
  name: string;
  isPublic: boolean;
  isExists: boolean;
}

interface ShelfSelectListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  shelfBookStatus: ShelfBookStatus[];
  onBookshelfToggle: (id: string) => void;
  onCreateNew: () => void;
  onCancel: () => void;
  onComplete: () => void;
}

export function ShelfSelectListDialog({
  isOpen,
  onClose,
  shelfBookStatus,
  onBookshelfToggle,
  onCreateNew,
  onCancel,
  onComplete,
}: ShelfSelectListDialogProps) {
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
          {shelfBookStatus.map((bookshelf) => (
            <button
              key={bookshelf.id}
              onClick={() => onBookshelfToggle(bookshelf.id)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
            >
              <Checkbox
                checked={bookshelf.isExists}
                className="pointer-events-none"
              />
              <span className="flex-1 text-sm font-medium text-foreground">
                {bookshelf.name}
              </span>
              {bookshelf.isPublic ? (
                <Globe className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
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
