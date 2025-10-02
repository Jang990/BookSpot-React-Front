"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createBookshelf } from "@/utils/api/BookshelfApi";
import { MAX_SHELF_NAME_LENGTH } from "@/types/Bookshelf";
import { ShelfPublicSwitch } from "@/components/molecules/shelf/ShelfForm";

interface BookshelfSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (updatedBookshelf: BookshelfDetailResponseSpec) => void;
}

export const BookshelfCreationDialog = ({
  isOpen,
  onClose = () => {},
  onCreate: onCreate,
}: BookshelfSettingsDialogProps) => {
  const DEFAULT_NAME = "";
  const DEFAULT_IS_PUBLIC = false;

  const [name, setName] = useState(DEFAULT_NAME);
  const [isPublic, setIsPublic] = useState(DEFAULT_IS_PUBLIC);

  const handleSave = () => {
    if (name.trim() === "") {
      alert("책장 이름을 입력해주세요.");
      return;
    }

    createBookshelf({
      creationRequest: { name: name, isPublic: isPublic },
      side: "client",
    }).then((response) => {
      onCreate(response);
      onClose();
    });
  };

  const handleClose = () => {
    setName(DEFAULT_NAME);
    setIsPublic(DEFAULT_IS_PUBLIC);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>책장 추가</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              책장 이름
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="책장 이름을 입력하세요"
              maxLength={MAX_SHELF_NAME_LENGTH}
            />
          </div>

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
