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
  ModernModal,
  ModernModalContent,
  ModernModalFooter,
  ModernModalHeader,
} from "@/components/ui/custom-dialog";

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
    <ModernModal isOpen={isOpen} onClose={handleClose}>
      <ModernModalHeader onClose={handleClose}>책장 추가</ModernModalHeader>

      <ModernModalContent className="space-y-4">
        <ShelfNameInput name={name} setName={setName} />
        <ShelfPublicSwitch isPublic={isPublic} setIsPublic={setIsPublic} />
      </ModernModalContent>

      <ModernModalFooter>
        <Button variant="outline" onClick={handleClose}>
          취소
        </Button>
        <Button disabled={!name} onClick={handleSave}>
          저장
        </Button>
      </ModernModalFooter>
    </ModernModal>
  );
};
