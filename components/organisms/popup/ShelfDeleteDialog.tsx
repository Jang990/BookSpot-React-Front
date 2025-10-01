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

const DELETE_CONFIRMATION_TEXT = "삭제하기"; // 오타 방지를 위해 상수로 관리
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
  // 2. 사용자가 입력하는 텍스트를 관리할 state 추가
  const [confirmationText, setConfirmationText] = useState("");

  // 3. 다이얼로그가 열릴 때마다 입력창을 초기화하는 로직 추가
  useEffect(() => {
    if (isOpen) {
      setConfirmationText("");
    }
  }, [isOpen]);

  if (!isOpen || !shelf) return null;

  // 4. 입력된 텍스트와 확인 텍스트가 일치하는지 확인
  const isDeleteButtonEnabled = confirmationText === DELETE_CONFIRMATION_TEXT;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>책장 삭제</DialogTitle>
          <DialogDescription className="pt-2">
            이 작업은 되돌릴 수 없습니다. '{shelf.name}' 책장을 영구적으로
            삭제하려면, 아래에{" "}
            <b className="text-red-500">{DELETE_CONFIRMATION_TEXT}</b>를
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
            onClick={onDelete}
            // 6. 텍스트가 일치할 때만 버튼 활성화
            disabled={!isDeleteButtonEnabled}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
