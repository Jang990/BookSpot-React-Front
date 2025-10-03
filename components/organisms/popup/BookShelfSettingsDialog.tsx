"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateBookshelf } from "@/utils/api/BookshelfApi";
import {
  ShelfNameInput,
  ShelfPublicSwitch,
} from "@/components/molecules/shelf/ShelfForm";
import {
  ModernDialog,
  ModernDialogHeader,
  ModernDialogContent,
  ModernDialogFooter,
} from "@/components/ui/custom-dialog";

interface BookshelfSettingsModalProps {
  bookshelf?: ShelfUpdateOptions;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedBookshelf: ShelfUpdateOptions) => void;
}

export interface ShelfUpdateOptions {
  id: string;
  name: string;
  isPublic: boolean;
}

export const BookshelfSettingsDialog = ({
  bookshelf,
  isOpen,
  onClose,
  onUpdate,
}: BookshelfSettingsModalProps) => {
  const [shelfId, setShelfId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);

  useEffect(() => {
    if (bookshelf) {
      setShelfId(bookshelf.id);
      setName(bookshelf.name);
      setIsPublic(bookshelf.isPublic);
    }
  }, [bookshelf]);

  const handleSave = () => {
    if (name.trim() === "") {
      alert("책장 이름을 입력해주세요.");
      return;
    }

    updateBookshelf({
      shelfId: shelfId,
      creationRequest: { name: name, isPublic: isPublic },
      side: "client",
    }).then(() => {
      onUpdate({ id: shelfId, name: name, isPublic: isPublic });
      onClose();
    });
  };

  const handleClose = () => {
    onClose();
  };

  if (!bookshelf) return null;

  return (
    <ModernDialog isOpen={isOpen} onClose={handleClose}>
      <ModernDialogHeader
        onClose={handleClose}
        description="책장의 이름과 공개 설정을 변경할 수 있습니다."
      >
        책장 설정
      </ModernDialogHeader>

      <ModernDialogContent className="space-y-4">
        <ShelfNameInput name={name} setName={setName} />
        <ShelfPublicSwitch isPublic={isPublic} setIsPublic={setIsPublic} />
      </ModernDialogContent>

      <ModernDialogFooter>
        <Button variant="outline" onClick={handleClose}>
          취소
        </Button>
        <Button disabled={!name} onClick={handleSave}>
          저장
        </Button>
      </ModernDialogFooter>
    </ModernDialog>
  );
};
