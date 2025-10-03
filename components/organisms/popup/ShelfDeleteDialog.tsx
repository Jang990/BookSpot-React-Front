"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { deleteBookshelf } from "@/utils/api/BookshelfApi";
import {
  ModernDialog,
  ModernDialogHeader,
  ModernDialogContent,
  ModernDialogFooter,
} from "@/components/ui/custom-dialog";
import { ShelfUpdateOptions } from "./ShelfUpdateDialog";

const DELETE_CONFIRMATION_TEXT = "삭제하기";

export const ShelfDeleteDialog = ({
  isOpen,
  shelf,
  onDelete,
  onClose,
}: {
  isOpen: boolean;
  shelf: ShelfUpdateOptions | null;
  onDelete: () => void;
  onClose: () => void;
}) => {
  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setConfirmationText("");
    }
  }, [isOpen]);

  if (!shelf) return null;

  const deleteShelf = () => {
    deleteBookshelf({ shelfId: shelf.id, side: "client" }).then(() => {
      onDelete();
    });
  };

  return (
    <ModernDialog isOpen={isOpen} onClose={onClose}>
      <ModernDialogHeader
        onClose={onClose}
        description={`'${shelf.name}' 책장을 영구 삭제`}
      >
        책장 삭제
      </ModernDialogHeader>

      <ModernDialogContent>
        <Input
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder={`'${DELETE_CONFIRMATION_TEXT}'를 입력해주세요.`}
          autoComplete="off"
          className="w-full"
        />
      </ModernDialogContent>

      <ModernDialogFooter>
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="destructive"
          onClick={deleteShelf}
          disabled={confirmationText !== DELETE_CONFIRMATION_TEXT}
        >
          삭제
        </Button>
      </ModernDialogFooter>
    </ModernDialog>
  );
};
