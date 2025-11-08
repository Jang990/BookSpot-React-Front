"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { deleteMe } from "@/utils/api/UsersApi";

interface TEMP_UserDetail {
  loginEmail: string;
  createdAt: string;
}

export const UserProfileTemplate = ({ users }: { users: TEMP_UserDetail }) => {
  const router = useRouter();
  return (
    <div className="mt-5">
      {/* 계정 섹션 */}
      <div>
        <ItemTitle title="계정" />
        <div className="space-y-1">
          <InfoItem label="이메일" value={users.loginEmail} />
          <InfoItem label="가입일" value={users.createdAt} />
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
              deleteMe({ side: "client" }).then(() => {
                router.push("/");
              });
            }}
            variant="destructive"
          />
        </div>
      </div>
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
