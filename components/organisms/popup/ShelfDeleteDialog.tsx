"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { deleteBookshelf } from "@/utils/api/BookshelfApi";
import {
  ModernModal,
  ModernModalHeader,
  ModernModalContent,
  ModernModalFooter,
} from "@/components/ui/custom-dialog";
import { ShelfUpdateOptions } from "./BookShelfSettingsDialog";

const DELETE_CONFIRMATION_TEXT = "삭제하기";

export const DeleteBookshelfDialog = ({
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
    <ModernModal isOpen={isOpen} onClose={onClose}>
      <ModernModalHeader
        onClose={onClose}
        description={`'${shelf.name}' 책장을 영구 삭제하세요.`}
      >
        책장 삭제
      </ModernModalHeader>

      <ModernModalContent>
        <Input
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder={`'${DELETE_CONFIRMATION_TEXT}'를 입력해주세요.`}
          autoComplete="off"
          className="w-full"
        />
      </ModernModalContent>

      <ModernModalFooter>
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
      </ModernModalFooter>
    </ModernModal>
  );
};
