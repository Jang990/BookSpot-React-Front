import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const TIMEOUT_MS = 8_000;

export class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request(
    req: NextRequest,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
  ): Promise<NextResponse> {
    const session = await auth();
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const url = this.baseUrl + pathname + search;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(session?.backendToken
          ? { Authorization: `Bearer ${session.backendToken}` }
          : {}),
      },
      signal: controller.signal,
    };

    // GET이나 DELETE가 아니라면 BODY에 값이 있을 때 값을 넣어줌
    if (method !== "GET" && method !== "DELETE") {
      try {
        const body = await req.json();
        requestOptions.body = JSON.stringify(body);
      } catch (error) {
        // 본문이 비어있거나, JSON 형식이 아닐 경우 => 본문 없이 요청
      }
    }

    try {
      const response = await fetch(url, requestOptions);

      clearTimeout(timeout);

      if (response.status === 204) {
        return new NextResponse(null, { status: 204 });
      }

      const json = await response.json();

      return NextResponse.json(json, { status: response.status });
    } catch (error) {
      return new NextResponse("server error", {
        status: 500,
      });
    }
  }

  async get(req: NextRequest) {
    return this.request(req, "GET");
  }

  async post(req: NextRequest) {
    return this.request(req, "POST");
  }

  async put(req: NextRequest) {
    return this.request(req, "PUT");
  }

  async delete(req: NextRequest) {
    return this.request(req, "DELETE");
  }
}

// 싱글톤 인스턴스
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_SERVER_URL!);
export default apiClient;
