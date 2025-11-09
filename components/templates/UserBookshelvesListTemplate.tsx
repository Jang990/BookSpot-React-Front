"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MAX_USER_SHELF_SIZE, type BookshelfSummary } from "@/types/Bookshelf";
import { Plus, Book, MoreVertical, Edit, Trash2 } from "lucide-react";
import { ShelfCreateDialog } from "../organisms/popup/ShelfCreateDialog";
import { BookPreviewImage } from "../molecules/BookPreviewImage";
import {
  CommonIconButton,
  CommonIconDropdown,
} from "../atoms/button/icon/CommonIconButton";
import {
  ShelfUpdateDialog,
  ShelfUpdateOptions,
} from "../organisms/popup/ShelfUpdateDialog";
import { BookshelfDetailResponseSpec } from "@/types/ApiSpec";
import { ShelfDeleteDialog } from "../organisms/popup/ShelfDeleteDialog";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderGroup,
  PageHeaderSubLabel,
  PageHeaderTitle,
} from "../ui/custom-page-title";
import { REDIRECT_QUERY_STRING_KEY } from "@/utils/querystring/RedirectUri";
import { IsPublicBadge } from "../molecules/IsPublicBadge";

export const UserBookshelvesListTemplate = ({
  shelves,
  ownerId,
}: {
  shelves: BookshelfSummary[];
  ownerId: string;
}) => {
  const [bookshelves, setBookshelves] = useState<BookshelfSummary[]>(shelves);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [selectedShelf, setSelectedShelf] = useState<BookshelfSummary | null>(
    null
  );
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  // 다이얼로그를 닫고 상태를 초기화하는 공통 함수
  const handleCloseDialog = () => {
    setSelectedShelf(null);
    setDialogType(null);
  };

  // 책장 업데이트
  const updateBookshelf = (newShelf: ShelfUpdateOptions) => {
    if (!selectedShelf) return;

    const updated = bookshelves.map((shelf) =>
      shelf.id === selectedShelf.id
        ? {
            ...shelf,
            name: newShelf.name.trim(),
            isPublic: newShelf.isPublic,
            createdAt: new Date().toISOString(),
          }
        : shelf
    );
    setBookshelves(updated);
    handleCloseDialog(); // 다이얼로그 닫기
  };

  // 책장 삭제
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

  // 새로운 책장을 UI 리스트에 추가
  const addNewShelfToUiList = (shelf: BookshelfDetailResponseSpec) => {
    const newShelf: BookshelfSummary = {
      id: shelf.id,
      name: shelf.name,
      bookCount: shelf.bookCount,
      createdAt: shelf.createdAt,
      isPublic: shelf.isPublic,
      thumbnailImageIsbn: [],
      ownerId: ownerId,
    };

    setBookshelves([newShelf, ...bookshelves]);
    setShowCreateDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div>
        {pageTitle()}
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

        <ShelfCreateDialog
          isOpen={showCreateDialog}
          onClose={() => {
            setShowCreateDialog(false);
          }}
          onCreate={addNewShelfToUiList}
        />
        <ShelfUpdateDialog
          bookshelf={selectedShelf ?? undefined}
          isOpen={dialogType === "edit"}
          onClose={handleCloseDialog}
          onUpdate={updateBookshelf}
        />
        <ShelfDeleteDialog
          isOpen={dialogType === "delete"}
          shelf={selectedShelf}
          onDelete={deleteBookshelf}
          onClose={handleCloseDialog}
        />
      </div>
    </div>
  );

  function pageTitle() {
    return (
      <PageHeader>
        {/* 제목과 서브라벨을 세로로 묶기 위해 Group 사용 */}
        <PageHeaderGroup>
          <PageHeaderTitle>내 책장</PageHeaderTitle>
          <PageHeaderSubLabel>
            {bookshelves.length} / {MAX_USER_SHELF_SIZE}개 사용중
          </PageHeaderSubLabel>
        </PageHeaderGroup>

        <PageHeaderActions>
          <CommonIconButton
            icon={<Plus />}
            disabled={bookshelves.length >= MAX_USER_SHELF_SIZE}
            onClick={() => setShowCreateDialog(true)}
          />
        </PageHeaderActions>
      </PageHeader>
    );
  }
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
    <Link
      href={`/bookshelves/${shelf.id}?${REDIRECT_QUERY_STRING_KEY}=/me/bookshelves`}
      className="flex-1"
    >
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
                label: "책장 설정",
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
        <IsPublicBadge isPublic={shelf.isPublic} />
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
                disabledClick
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
