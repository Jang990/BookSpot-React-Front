import { NextRequest, NextResponse } from "next/server";

const TIMEOUT_MS = 8_000;

export class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(req: NextRequest): Promise<NextResponse> {
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const url = this.baseUrl + pathname + search;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      // 외부 API로 통신
      const json = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }).then((req) => req.json());

      clearTimeout(timeout);

      return NextResponse.json(json);
    } catch (error) {
      return new NextResponse("server error", {
        status: 500,
      });
    }
  }

  // 필요 시 post, put, delete 등 추가
  async post<T>(req: NextRequest): Promise<NextResponse> {
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const url = this.baseUrl + pathname + search;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      // 외부 API로 통신
      const json = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }).then((req) => req.json());

      clearTimeout(timeout);

      return NextResponse.json(json);
    } catch (error) {
      return new NextResponse("server error", {
        status: 500,
      });
    }
  }
}

// 싱글톤 인스턴스
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_SERVER_URL!);
export default apiClient;
