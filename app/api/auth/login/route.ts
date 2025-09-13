import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { provider, token } = await req.json();

    if (!provider || !token) {
      return new NextResponse("Provider and token are required", {
        status: 400,
      });
    }

    // provider 값에 따라 백엔드 API의 최종 URI를 동적 결정
    const backendUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/auth/${provider}`;
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: token }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("/api/auth/login Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
