"use client";
import { Button } from "@/components/ui/button";

interface Props {
  onClick?: () => void;
}

export const NaverLoginButton = ({ onClick = () => {} }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
          <span className="text-green-500 font-bold text-sm">N</span>
        </div>
        네이버로 계속하기
      </div>
    </Button>
  );
};
