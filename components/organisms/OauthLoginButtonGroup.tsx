"use client";
import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "@/components/molecules/button/login/GoogleLoginButton";
import { KakaoLoginButton } from "@/components/molecules/button/login/KakaoLoginButton";
import { NaverLoginButton } from "@/components/molecules/button/login/NaverLoginButton";

interface Props {
  redirectUri: string;
}

export const OauthLoginButtonGroup = ({ redirectUri }: Props) => {
  return (
    <div className="space-y-4">
      <NaverLoginButton
        onClick={() => {
          signIn("naver", { redirectTo: redirectUri });
        }}
      />
      {/* <KakaoLoginButton
        onClick={() => {
          console.log("카카오 로그인");
        }}
      /> */}
      <GoogleLoginButton
        onClick={() => {
          signIn("google", { redirectTo: redirectUri });
        }}
      />
    </div>
  );
};
