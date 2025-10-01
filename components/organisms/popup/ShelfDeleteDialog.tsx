"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShelfSettingOptions } from "./BookShelfSettingsDialog";
import { useEffect, useState } from "react";
import { deleteBookshelf } from "@/utils/api/BookshelfApi";

const DELETE_CONFIRMATION_TEXT = "삭제하기";
export const DeleteBookshelfDialog = ({
  isOpen,
  shelf,
  onDelete,
  onClose,
}: {
  isOpen: boolean;
  shelf: ShelfSettingOptions | null;
  onDelete: () => void;
  onClose: () => void;
}) => {
  const [confirmationText, setConfirmationText] = useState("");
  useEffect(() => {
    if (isOpen) {
      setConfirmationText("");
    }
  }, [isOpen]);

  if (!isOpen || !shelf) return null;

  const deleteShelf = () => {
    deleteBookshelf({ shelfId: shelf.id, side: "client" }).then(() => {
      onDelete();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>책장 삭제</DialogTitle>
          <DialogDescription className="pt-2">
            이 작업은 되돌릴 수 없습니다. '{shelf.name}' 책장을 영구 삭제하려면,
            아래에 <b className="text-red-500">{DELETE_CONFIRMATION_TEXT}</b>를
            입력해주세요.
          </DialogDescription>
        </DialogHeader>

        {/* 5. 텍스트 입력창 추가 */}
        <div className="py-2">
          <Input
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder={DELETE_CONFIRMATION_TEXT}
            autoComplete="off"
          />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={deleteShelf}
            // 6. 텍스트가 일치할 때만 버튼 활성화
            disabled={confirmationText !== DELETE_CONFIRMATION_TEXT}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
