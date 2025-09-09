"use client";
import { Button } from "@/components/ui/button";

interface Props {
  onClick?: () => void;
}

export const KakaoLoginButton = ({ onClick = () => {} }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
          <span className="text-yellow-400 font-bold text-sm">K</span>
        </div>
        카카오로 계속하기
      </div>
    </Button>
  );
};
