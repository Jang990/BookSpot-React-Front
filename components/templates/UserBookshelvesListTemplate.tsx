"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BookshelfSummary } from "@/types/Bookshelf";
import { Plus, Book, MoreVertical } from "lucide-react";
import { GrayBadge, GreenBadge } from "@/components/atoms/badge/TextLabelBadge";
import { fetchUserBookshelvesSummary } from "@/utils/api/BookshelfApi";
import { BookshelfCreationDialog } from "../organisms/popup/BookShelfCreationDialog";
import { BookPreviewImage } from "../molecules/BookPreviewImage";
import { PageTitleAndButton } from "../molecules/title/PageTitle";

export const UserBookshelvesListTemplate = () => {
  const [bookshelves, setBookshelves] = useState<BookshelfSummary[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingShelf, setEditingShelf] = useState<BookshelfSummary | null>(
    null
  );
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchUserBookshelvesSummary({ userId: "1", side: "client" }).then(
      (data) => {
        setBookshelves(data.bookshelvesSummary);
      }
    );
  }, []);

  const updateBookshelfName = () => {
    if (!editingShelf || editName.trim() === "") {
      alert("책장 이름을 입력해주세요.");
      return;
    }

    const updated = bookshelves.map((shelf) =>
      shelf.id === editingShelf.id ? { ...shelf, name: editName.trim() } : shelf
    );
    setBookshelves(updated);
    setEditingShelf(null);
    setEditName("");
  };

  const startEditing = (shelf: BookshelfSummary) => {
    setEditingShelf(shelf);
    setEditName(shelf.name);
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
            <BookshelfCard key={shelf.id} shelf={shelf} onEdit={startEditing} />
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

        <EditBookshelfDialog
          editingShelf={editingShelf}
          editName={editName}
          setEditName={setEditName}
          onUpdate={updateBookshelfName}
          onClose={() => setEditingShelf(null)}
        />
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
      </div>
    </div>
  );
};

export const BookshelfCard = ({
  shelf,
  onEdit,
}: {
  shelf: BookshelfSummary;
  onEdit: (shelf: BookshelfSummary) => void;
}) => {
  return (
    <Link href={`/bookshelves/${shelf.id}`} className="flex-1">
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <BookshelfCardHeader shelf={shelf} onEdit={onEdit} />
        <BookshelfCardContent shelf={shelf} />
      </Card>
    </Link>
  );
};

const BookshelfCardHeader = ({
  shelf,
  onEdit,
}: {
  shelf: BookshelfSummary;
  onEdit: (shelf: BookshelfSummary) => void;
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
          <Button variant="ghost" size="sm" onClick={() => onEdit(shelf)}>
            <MoreVertical className="w-3 h-3" />
          </Button>
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

const EditBookshelfDialog = ({
  editingShelf,
  editName,
  setEditName,
  onUpdate,
  onClose,
}: {
  editingShelf: BookshelfSummary | null;
  editName: string;
  setEditName: (v: string) => void;
  onUpdate: () => void;
  onClose: () => void;
}) => {
  return (
    <Dialog open={!!editingShelf} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>책장 이름 변경</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="새 책장 이름을 입력하세요"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            maxLength={50}
            onKeyDown={(e) => e.key === "Enter" && onUpdate()}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button onClick={onUpdate}>변경</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
