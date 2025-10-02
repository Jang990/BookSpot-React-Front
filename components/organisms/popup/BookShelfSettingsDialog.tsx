"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateBookshelf } from "@/utils/api/BookshelfApi";
import {
  ShelfNameInput,
  ShelfPublicSwitch,
} from "@/components/molecules/shelf/ShelfForm";

interface BookshelfSettingsDialogProps {
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
}: BookshelfSettingsDialogProps) => {
  if (!bookshelf || !isOpen) return null;

  const [shelfId, setShelfId] = useState(bookshelf.id);
  const [name, setName] = useState(bookshelf.name);
  const [isPublic, setIsPublic] = useState(bookshelf.isPublic);

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
    setShelfId("0");
    setName(bookshelf.name);
    setIsPublic(bookshelf.isPublic);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>책장 설정</DialogTitle>
          <DialogDescription>
            책장의 이름과 공개 설정을 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ShelfNameInput name={name} setName={setName} />
          <ShelfPublicSwitch isPublic={isPublic} setIsPublic={setIsPublic} />
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button disabled={!name} onClick={handleSave}>
              저장
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
