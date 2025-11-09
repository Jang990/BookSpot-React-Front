"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserDeleteDialog } from "../organisms/popup/UserDeleteDialog";
import { UserDetailResponseSpec } from "@/types/ApiSpec";

export const UserProfileTemplate = ({
  user,
}: {
  user: UserDetailResponseSpec;
}) => {
  const router = useRouter();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  const dateOnly = (dateStr: string): string => {
    return new Date(dateStr).toISOString().split("T")[0];
  };
  return (
    <div className="mt-5">
      {/* 계정 섹션 */}
      <div>
        <ItemTitle title="계정" />
        <div className="space-y-1">
          <InfoItem label="이메일" value={user.email} />
          <InfoItem label="가입일" value={dateOnly(user.createdAt)} />
        </div>
      </div>

      <Separator className="my-4" />

      {/* 메뉴 섹션 */}
      <div>
        <ItemTitle title="메뉴" />
        <div className="space-y-1">
          <MenuItem
            label="책가방"
            onClick={() => {
              router.push("/cart");
            }}
          />
          <MenuItem
            label="내 책장"
            onClick={() => {
              router.push("/me/bookshelves");
            }}
          />
        </div>
      </div>

      <Separator className="my-4" />

      {/* 기타 섹션 */}
      <div>
        <ItemTitle title="기타" />
        <div className="space-y-1">
          <MenuItem
            label="로그아웃"
            onClick={() => {
              signOut({ redirectTo: "/" });
            }}
          />
          <MenuItem
            label="회원탈퇴"
            onClick={() => {
              setIsOpenDeleteDialog(true);
            }}
            variant="destructive"
          />
        </div>
      </div>
      <UserDeleteDialog
        isOpen={isOpenDeleteDialog}
        onDelete={() => {
          setIsOpenDeleteDialog(false);
          signOut({ redirectTo: "/" });
        }}
        onClose={() => setIsOpenDeleteDialog(false)}
      />
    </div>
  );
};

function ItemTitle({ title }: { title: string }) {
  return <h2 className="mb-3 px-5 text-lg font-bold">{title}</h2>;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base text-foreground">{value}</p>
      </div>
    </div>
  );
}

function MenuItem({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 h-auto py-4 px-4 ${
        variant === "destructive"
          ? "text-destructive hover:text-destructive hover:bg-destructive/10"
          : ""
      }`}
      onClick={onClick}
    >
      <span className="text-base">{label}</span>
    </Button>
  );
}
