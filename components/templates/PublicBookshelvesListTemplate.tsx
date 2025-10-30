"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type BookshelfSummary } from "@/types/Bookshelf";
import { Plus, Book } from "lucide-react";
import { GrayBadge, GreenBadge } from "@/components/atoms/badge/TextLabelBadge";
import { BookPreviewImage } from "../molecules/BookPreviewImage";
import { CommonIconButton } from "../atoms/button/icon/CommonIconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderGroup,
  PageHeaderTitle,
} from "../ui/custom-page-title";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  createRedirectLoginUrl,
  REDIRECT_QUERY_STRING_KEY,
} from "@/utils/querystring/RedirectUri";
import { useToast } from "@/contexts/ToastContext";

export const PublicBookshelvesListTemplate = ({
  shelves,
}: {
  shelves: BookshelfSummary[];
}) => {
  const { status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <div>
        <div className="mb-5">{pageTitle()}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelves.map((shelf) => (
            <BookshelfCard key={shelf.id} shelf={shelf} />
          ))}
        </div>

        {shelves.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">아직 책장이 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              첫 번째 책장을 만들어보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );

  function pageTitle() {
    return (
      <PageHeader>
        {/* 제목과 서브라벨을 세로로 묶기 위해 Group 사용 */}
        <PageHeaderGroup>
          <PageHeaderTitle>책장 목록</PageHeaderTitle>
        </PageHeaderGroup>

        <PageHeaderActions>
          <CommonIconButton
            icon={<Plus />}
            onClick={() => {
              if (status === "authenticated") {
                showToast("내 책장에서 책장을 추가해주세요!", "INFO");
                router.push("/me/bookshelves");
              } else {
                const { pathname, search } = window.location;
                const currentUri = pathname + search;
                router.push(createRedirectLoginUrl(currentUri));
              }
            }}
          />
        </PageHeaderActions>
      </PageHeader>
    );
  }
};

function currentUri() {
  const { pathname, search } = window.location;
  return pathname + search;
}

export const BookshelfCard = ({ shelf }: { shelf: BookshelfSummary }) => {
  const router = useRouter();
  return (
    // href를 쓰면 렌더링된 상태를 쓰기 때문에 currentUri는 항상 "/"을 반환한다.
    // 그래서 onClick을 사용해서 클릭 시점에 값을 얻도록 만든다
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.push(
          `/bookshelves/${shelf.id}?${REDIRECT_QUERY_STRING_KEY}=${currentUri()}`
        );
      }}
      className="flex-1"
    >
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <ReadonlyBookshelfCardHeader shelf={shelf} />
        <BookshelfCardContent shelf={shelf} />
      </Card>
    </Link>
  );
};

const ReadonlyBookshelfCardHeader = ({
  shelf,
}: {
  shelf: BookshelfSummary;
}) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {shelf.name}
        </CardTitle>
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
