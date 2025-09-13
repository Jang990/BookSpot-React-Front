import NextAuth, { Account } from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // jwt 콜백: 로그인 성공 시 백엔드에 로그인/회원가입 요청을 보냅니다.
    async jwt({ token, user, account }) {
      // 처음 로그인할 때만 백엔드에 요청합니다.
      if (user && account) {
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: account.provider,
                token: getTokenForProvider(account),
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Backend login failed");
          }

          const backendData = await response.json();

          // 백엔드로부터 받은 JWT를 세션 토큰에 저장합니다.
          token.backendToken = backendData.accessToken;
          token.userRole = backendData.role;
          token.exp = Math.floor(backendData.expiredAt / 1000);
        } catch (error) {
          console.error("JWT Callback Error:", error);
          token.error = "BackendLoginError";
        }
      }
      return token;
    },

    // session 콜백: jwt 콜백에서 저장한 정보를 클라이언트 세션으로 전달합니다.
    async session({ session, token }) {
      session.backendToken = token.backendToken as string;
      // user 객체에 role 같은 커스텀 데이터를 추가할 수 있습니다.
      if (session.user) {
        (session.user as any).role = token.userRole as string;
      }
      return session;
    },
  },
});

/**
 * NextAuth의 Account 객체에서 provider에 따라 적절한 인증 토큰을 반환합니다.
 * @param account - NextAuth의 Account 객체
 * @returns provider에 맞는 인증 토큰 (id_token 또는 access_token)
 */
const getTokenForProvider = (account: Account): string | undefined => {
  switch (account.provider) {
    case "google":
      return account.id_token;
    case "naver":
      // case "kakao":
      return account.access_token;
    default:
      // 지원하지 않는 provider에 대한 예외 처리
      throw new Error(`Unsupported provider: ${account.provider}`);
  }
};
