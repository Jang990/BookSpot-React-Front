import { Button } from "@/components/ui/button";

interface SelectLibraryButtonProps {
  onClick?: () => void;
}

export const SelectLibraryButton = ({ onClick }: SelectLibraryButtonProps) => {
  return (
    <div className="py-1">
      <Button onClick={onClick} className="w-full">
        도서관 선택
      </Button>
    </div>
  );
};
