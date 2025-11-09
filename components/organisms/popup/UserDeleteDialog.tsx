"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  ModernDialog,
  ModernDialogHeader,
  ModernDialogContent,
  ModernDialogFooter,
} from "@/components/ui/custom-dialog";
import { deleteMe } from "@/utils/api/UsersApi";

const DELETE_CONFIRMATION_TEXT = "회원탈퇴";

export const UserDeleteDialog = ({
  isOpen,
  onDelete,
  onClose,
}: {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}) => {
  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setConfirmationText("");
    }
  }, [isOpen]);

  const deleteUser = () => {
    deleteMe({ side: "client" }).then(() => onDelete());
  };

  return (
    <ModernDialog isOpen={isOpen} onClose={onClose}>
      <ModernDialogHeader
        onClose={onClose}
        description={`계정정보, 책장정보가 모두 삭제됩니다.`}
      >
        회원탈퇴
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
          onClick={deleteUser}
          disabled={confirmationText !== DELETE_CONFIRMATION_TEXT}
        >
          삭제
        </Button>
      </ModernDialogFooter>
    </ModernDialog>
  );
};
