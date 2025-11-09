"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";
import { createBookshelf } from "@/utils/api/BookshelfApi";
import {
  ShelfNameInput,
  ShelfPublicSwitch,
} from "@/components/molecules/shelf/ShelfForm";
import {
  ModernDialog,
  ModernDialogContent,
  ModernDialogFooter,
  ModernDialogHeader,
} from "@/components/ui/custom-dialog";

interface BookshelfSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (updatedBookshelf: BookshelfDetailResponseSpec) => void;
}

export const ShelfCreateDialog = ({
  isOpen,
  onClose = () => {},
  onCreate = (updatedBookshelf) => {},
}: BookshelfSettingsDialogProps) => {
  const DEFAULT_NAME = "";
  const DEFAULT_IS_PUBLIC = true;

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
    <ModernDialog isOpen={isOpen} onClose={handleClose}>
      <ModernDialogHeader onClose={handleClose}>책장 추가</ModernDialogHeader>

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
