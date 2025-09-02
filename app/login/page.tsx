import { GoogleLoginButton } from "@/components/molecules/button/login/GoogleLoginButton";
import { KakaoLoginButton } from "@/components/molecules/button/login/KakaoLoginButton";
import { NaverLoginButton } from "@/components/molecules/button/login/NaverLoginButton";
import { OauthLoginButtonGroup } from "@/components/organisms/OauthLoginButtonGroup";

export default async function LoginPage() {
  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ height: "calc(100vh - 64px - 64px)" }}
    >
      <div className="w-full max-w-md">
        <div className="backdrop-blur-sm bg-card/80 border border-border/50 rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-primary">BookSpot</h1>
            <p className="text-muted-foreground">
              소셜 계정으로 빠르게 시작하세요
            </p>
          </div>

          <OauthLoginButtonGroup />
        </div>
      </div>
    </div>
  );
}
