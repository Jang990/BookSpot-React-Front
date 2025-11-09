import NextAuth, { Account } from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Kakao from "next-auth/providers/kakao";

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
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
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
          token.userId = backendData.userId;
          token.exp = Math.floor(backendData.expiredAt / 1000);
          token.expiresAtMs = backendData.expiredAt;
        } catch (error) {
          console.error("JWT Callback Error:", error);
          token.error = "BackendLoginError";
        }
      }

      /*
        첫 로그인 시도 시에만 user - account 값이 들어옴.
        useSession, auth등등을 사용할 때는 user - account값이 안들어온채로 jwt 콜백이 실행됨 
        그래서 다음과 같은 로직이 필요해짐
      */
      if (!token.expiresAtMs) return { ...token, exp: 0 }; // ms단위잘못된 토큰
      if (Date.now() >= token.expiresAtMs) return { ...token, exp: 0 }; // 현재시간과 실제 만료시간 비교 후 만료시키기
      token.exp = Math.floor((token.expiresAtMs as number) / 1000); // exp 덮어쓰기.
      return token;
    },

    // session 콜백: jwt 콜백에서 저장한 정보를 클라이언트 세션으로 전달합니다.
    async session({ session, token }) {
      session.backendToken = token.backendToken as string;
      // user 객체에 role 같은 커스텀 데이터를 추가할 수 있습니다.
      if (session.user) {
        (session.user as any).role = token.userRole as string;
        (session.user as any).id = token.userId as string;
      }
      if (token.exp) {
        session.expiresAt = token.exp * 1000;
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
    case "kakao":
      return account.access_token;
    default:
      // 지원하지 않는 provider에 대한 예외 처리
      throw new Error(`Unsupported provider: ${account.provider}`);
  }
};
