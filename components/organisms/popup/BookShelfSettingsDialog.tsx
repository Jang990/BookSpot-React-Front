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
import { Trash2 } from "lucide-react";
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { deleteBookshelf, updateBookshelf } from "@/utils/api/BookshelfApi";

interface BookshelfSettingsDialogProps {
  bookshelf: BookshelfDetailResponseSpec;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedBookshelf: BookshelfDetailResponseSpec) => void;
  onDelete: () => void;
}

export const BookshelfSettingsDialog = ({
  bookshelf,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: BookshelfSettingsDialogProps) => {
  const [shelfId, setShelfId] = useState(bookshelf.id);
  const [name, setName] = useState(bookshelf.name);
  const [isPublic, setIsPublic] = useState(bookshelf.isPublic);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDelete = () => {
    deleteBookshelf({ shelfId: shelfId, side: "client" }).then(() => {
      handleClose();
      setShowDeleteConfirm(false);
      onDelete();
      onClose();
    });
  };

  const handleClose = () => {
    setShelfId("0");
    setName(bookshelf.name);
    setIsPublic(bookshelf.isPublic);
    setShowDeleteConfirm(false);
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
          <div>
            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  확인
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  취소
                </Button>
              </div>
            )}
          </div>

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
