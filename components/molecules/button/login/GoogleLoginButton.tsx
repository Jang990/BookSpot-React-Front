"use client";
import { Button } from "@/components/ui/button";

interface Props {
  onClick?: () => void;
}

export const GoogleLoginButton = ({ onClick = () => {} }: Props) => {
  return (
    <Button
      className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border-2 border-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        구글로 계속하기
      </div>
    </Button>
  );
};
