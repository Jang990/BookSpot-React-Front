import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 백엔드 서버의 로그인 API로 요청을 보냅니다.
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    // 백엔드로부터 받은 데이터를 그대로 jwt 콜백으로 전달합니다.
    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("/api/auth/login Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
