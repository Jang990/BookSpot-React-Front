import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const ShelfPublicSwitch = ({
  isPublic,
  setIsPublic,
}: {
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="public" className="text-right">
        공개 설정
      </Label>
      <div className="col-span-3 flex items-center space-x-2">
        <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
        <Label htmlFor="public" className="text-sm text-muted-foreground">
          {isPublic ? "다른 사용자가 볼 수 있습니다" : "나만 볼 수 있습니다"}
        </Label>
      </div>
    </div>
  );
};
