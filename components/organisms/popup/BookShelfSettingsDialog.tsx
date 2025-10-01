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
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateBookshelf } from "@/utils/api/BookshelfApi";
import { MAX_SHELF_NAME_LENGTH } from "@/types/Bookshelf";

interface BookshelfSettingsDialogProps {
  bookshelf?: ShelfSettingOptions;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedBookshelf: BookshelfDetailResponseSpec) => void;
}

export interface ShelfSettingOptions {
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
    }).then((response) => {
      onUpdate(response);
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="public" className="text-right">
              공개 설정
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public" className="text-sm text-muted-foreground">
                {isPublic
                  ? "다른 사용자가 볼 수 있습니다"
                  : "나만 볼 수 있습니다"}
              </Label>
            </div>
          </div>
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
