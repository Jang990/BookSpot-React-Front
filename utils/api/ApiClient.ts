import { NextRequest, NextResponse } from "next/server";

export class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(req: NextRequest): Promise<NextResponse> {
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const url = this.baseUrl + pathname + search;

    try {
      // 외부 API로 통신
      const json = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((req) => req.json());
      return NextResponse.json(json);
    } catch (error) {
      return new NextResponse("server error", {
        status: 500,
      });
    }
  }

  // 필요 시 post, put, delete 등 추가
}

// 싱글톤 인스턴스
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_FRONT_SERVER_URL!);
export default apiClient;
