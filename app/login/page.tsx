import { auth } from "@/auth";
import { OauthLoginButtonGroup } from "@/components/organisms/OauthLoginButtonGroup";
import { parseRedirectUri } from "@/utils/querystring/RedirectUri";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const queryStrings = await searchParams;
  const redirectUri = parseRedirectUri(queryStrings);

  const session = await auth();
  if (session) {
    redirect("/"); // 이미 로그인 → 루트로 이동
  }

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

          <OauthLoginButtonGroup redirectUri={redirectUri} />
        </div>
      </div>
    </div>
  );
}
