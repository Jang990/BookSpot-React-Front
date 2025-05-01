import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname; // "/api/books"
  const search = req.nextUrl.search; // "?title=clean%20code"
  const url = process.env.NEXT_PUBLIC_API_SERVER_URL + pathname + search;
  try {
    // 외부 API로 통신
    const json = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((req) => req.json());
    console.log(json);
    return NextResponse.json(json);
  } catch (error) {
    console.log(error);
    return new NextResponse("server error", {
      status: 500,
    });
  }
};
