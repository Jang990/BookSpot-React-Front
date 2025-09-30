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

interface BookshelfSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (updatedBookshelf: ShelfCreationRequest) => void;
}

export interface ShelfCreationRequest {
  name: string;
  isPublic: boolean;
}

export const BookshelfSettingsDialog = ({
  isOpen,
  onClose,
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

    onCreate({ name: name, isPublic: isPublic });
    onClose();
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
          <DialogTitle>책장 설정</DialogTitle>
          <DialogDescription>
            책장의 이름과 공개 설정을 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이름
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="책장 이름을 입력하세요"
              maxLength={50}
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
            <Button onClick={handleSave}>저장</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
