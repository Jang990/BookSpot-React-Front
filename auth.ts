import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
              body: JSON.stringify({ idToken: account.id_token }),
            }
          );

          if (!response.ok) {
            throw new Error("Backend login failed");
          }

          const backendData = await response.json();

          // 백엔드로부터 받은 JWT를 세션 토큰에 저장합니다.
          token.backendToken = backendData.accessToken;
          token.userRole = backendData.role;
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
