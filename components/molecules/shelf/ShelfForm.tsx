import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MAX_SHELF_NAME_LENGTH } from "@/types/Bookshelf";

export const ShelfNameInput = ({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        책장 이름
      </Label>
      <Input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="col-span-3"
        placeholder="책장 이름을 입력하세요"
        maxLength={MAX_SHELF_NAME_LENGTH}
      />
    </div>
  );
};

export const ShelfPublicSwitch = ({
  isPublic,
  setIsPublic,
}: {
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
}) => {
  // TODO: 책장 신고하기 기능과 함께 주석 해제
  return (
    <>
      {/* <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="public" className="text-right">
        공개 설정
      </Label>
      <div className="col-span-3 flex items-center space-x-2">
        <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
        <Label htmlFor="public" className="text-sm text-muted-foreground">
          {isPublic ? "다른 사용자와 함께 보기" : "혼자 보기"}
        </Label>
      </div>
    </div> */}
    </>
  );
};
