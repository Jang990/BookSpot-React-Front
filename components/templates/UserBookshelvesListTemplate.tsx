"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BookshelfSummary } from "@/types/Bookshelf";
import { Plus, Book, MoreVertical, Edit, Trash, Trash2 } from "lucide-react";
import { GrayBadge, GreenBadge } from "@/components/atoms/badge/TextLabelBadge";
import { fetchUserBookshelvesSummary } from "@/utils/api/BookshelfApi";
import { BookshelfCreationDialog } from "../organisms/popup/BookShelfCreationDialog";
import { BookPreviewImage } from "../molecules/BookPreviewImage";
import { PageTitleAndButton } from "../molecules/title/PageTitle";
import { CommonIconDropdown } from "../atoms/button/icon/CommonIconButton";
import { BookshelfSettingsDialog } from "../organisms/popup/BookShelfSettingsDialog";
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";

export const UserBookshelvesListTemplate = () => {
  const [bookshelves, setBookshelves] = useState<BookshelfSummary[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [selectedShelf, setSelectedShelf] = useState<BookshelfSummary | null>(
    null
  );
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  useEffect(() => {
    fetchUserBookshelvesSummary({ userId: "1", side: "client" }).then(
      (data) => {
        setBookshelves(data.bookshelvesSummary);
      }
    );
  }, []);

  // 다이얼로그를 닫고 상태를 초기화하는 공통 함수
  const handleCloseDialog = () => {
    setSelectedShelf(null);
    setDialogType(null);
  };

  // 책장 이름 업데이트 로직 (이제 새 이름을 인자로 받음)
  const updateBookshelfName = (newShelf: BookshelfDetailResponseSpec) => {
    if (!selectedShelf) return;

    const updated = bookshelves.map((shelf) =>
      shelf.id === selectedShelf.id
        ? {
            ...shelf,
            name: newShelf.name.trim(),
            isPublic: newShelf.isPublic,
            createdAt: newShelf.createdAt,
          }
        : shelf
    );
    setBookshelves(updated);
    handleCloseDialog(); // 다이얼로그 닫기
  };

  // 책장 삭제 로직
  const deleteBookshelf = () => {
    if (!selectedShelf) return;
    setBookshelves(
      bookshelves.filter((shelf) => shelf.id !== selectedShelf.id)
    );
    handleCloseDialog(); // 다이얼로그 닫기
  };

  // 수정 시작 함수
  const startEditing = (shelf: BookshelfSummary) => {
    setSelectedShelf(shelf);
    setDialogType("edit");
  };

  // 삭제 시작 함수
  const startDeleting = (shelf: BookshelfSummary) => {
    setSelectedShelf(shelf);
    setDialogType("delete");
  };

  return (
    <div className="min-h-screen bg-background">
      <div>
        <PageTitleAndButton
          title="내 책장"
          subLabel={`${bookshelves.length} / 5개 사용중`}
          btnIcon={<Plus onClick={() => console.log("HelloWorld!")} />}
          btnDisabled={bookshelves.length >= 5}
          onClickBtn={() => setShowCreateDialog(true)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookshelves.map((shelf) => (
            <BookshelfCard
              key={shelf.id}
              shelf={shelf}
              onEdit={startEditing}
              onDelete={startDeleting}
            />
          ))}
        </div>

        {bookshelves.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">아직 책장이 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              첫 번째 책장을 만들어보세요
            </p>
          </div>
        )}

        <BookshelfCreationDialog
          isOpen={showCreateDialog}
          onClose={() => {
            setShowCreateDialog(false);
          }}
          onCreate={(shelf) => {
            const newShelf: BookshelfSummary = {
              id: shelf.id,
              name: shelf.name,
              bookCount: shelf.bookCount,
              createdAt: shelf.createdAt,
              isPublic: shelf.isPublic,
              thumbnailImageIsbn: [],
            };

            setBookshelves([...bookshelves, newShelf]);
            setShowCreateDialog(false);
          }}
        />
        <BookshelfSettingsDialog
          bookshelf={selectedShelf ?? undefined}
          isOpen={dialogType === "edit"}
          onClose={handleCloseDialog}
          onUpdate={updateBookshelfName}
        />
        <DeleteBookshelfDialog
          isOpen={dialogType === "delete"}
          shelf={selectedShelf}
          onDelete={deleteBookshelf}
          onClose={handleCloseDialog}
        />
      </div>
    </div>
  );
};

export const BookshelfCard = ({
  shelf,
  onEdit,
  onDelete,
}: {
  shelf: BookshelfSummary;
  onEdit: (shelf: BookshelfSummary) => void;
  onDelete: (shelf: BookshelfSummary) => void;
}) => {
  return (
    <Link href={`/bookshelves/${shelf.id}`} className="flex-1">
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <BookshelfCardHeader
          shelf={shelf}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <BookshelfCardContent shelf={shelf} />
      </Card>
    </Link>
  );
};

const BookshelfCardHeader = ({
  shelf,
  onEdit,
  onDelete,
}: {
  shelf: BookshelfSummary;
  onEdit: (shelf: BookshelfSummary) => void;
  onDelete: (shelf: BookshelfSummary) => void;
}) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {shelf.name}
        </CardTitle>
        <div
          className="flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <CommonIconDropdown
            icon={<MoreVertical className="w-3 h-3" />}
            items={[
              {
                icon: <Edit className="h-4 w-4" />,
                label: "책장 수정",
                onClick: () => onEdit(shelf),
              },
              {
                icon: <Trash2 className="h-4 w-4" />,
                label: "책장 삭제",
                onClick: () => onDelete(shelf),
              },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Book className="w-4 h-4" />
        <span>{shelf.bookCount}권</span>
        {shelf.isPublic ? (
          <GreenBadge text="공개" />
        ) : (
          <GrayBadge text="비공개" />
        )}
      </div>
    </CardHeader>
  );
};

const BookshelfCardContent = ({ shelf }: { shelf: BookshelfSummary }) => {
  return (
    <CardContent>
      {shelf.thumbnailImageIsbn.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 h-24">
          {shelf.thumbnailImageIsbn.map((isbn) => (
            <div key={isbn}>
              <BookPreviewImage
                id={shelf.id}
                isbn13={isbn}
                height="h-24"
                title={null}
                rank={null}
                clickDisabled
              />
            </div>
          ))}
          {Array.from({ length: 3 - shelf.thumbnailImageIsbn.length }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-muted rounded flex items-center justify-center"
              >
                <Book className="w-4 h-4 text-muted-foreground" />
              </div>
            )
          )}
        </div>
      ) : (
        <div className="h-24 bg-muted rounded flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Book className="w-8 h-8 mx-auto mb-1" />
            <p className="text-xs">책이 없습니다</p>
          </div>
        </div>
      )}
    </CardContent>
  );
};

const DELETE_CONFIRMATION_TEXT = "삭제하기"; // 오타 방지를 위해 상수로 관리
const DeleteBookshelfDialog = ({
  isOpen,
  shelf,
  onDelete,
  onClose,
}: {
  isOpen: boolean;
  shelf: BookshelfSummary | null;
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
