"use client";
import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "@/components/molecules/button/login/GoogleLoginButton";
import { KakaoLoginButton } from "@/components/molecules/button/login/KakaoLoginButton";
import { NaverLoginButton } from "@/components/molecules/button/login/NaverLoginButton";

export const OauthLoginButtonGroup = () => {
  return (
    <div className="space-y-4">
      <NaverLoginButton
        onClick={() => {
          console.log("네이버 로그인");
        }}
      />
      <KakaoLoginButton
        onClick={() => {
          console.log("카카오 로그인");
        }}
      />
      <GoogleLoginButton
        onClick={() => {
          signIn("google", { redirectTo: "/" });
        }}
      />
    </div>
  );
};
