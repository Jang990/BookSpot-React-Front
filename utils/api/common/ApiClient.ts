import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const TIMEOUT_MS = 8_000;

export class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    req: NextRequest,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
  ): Promise<NextResponse> {
    const session = await auth();
    const pathname = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const url = this.baseUrl + pathname + search;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const json = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(session?.backendToken
            ? { Authorization: `Bearer ${session.backendToken}` }
            : {}),
        },
        signal: controller.signal,
      }).then((res) => res.json());

      clearTimeout(timeout);

      return NextResponse.json(json);
    } catch (error) {
      return new NextResponse("server error", {
        status: 500,
      });
    }
  }

  async get<T>(req: NextRequest) {
    return this.request<T>(req, "GET");
  }

  async post<T>(req: NextRequest) {
    return this.request<T>(req, "POST");
  }

  async put<T>(req: NextRequest) {
    return this.request<T>(req, "PUT");
  }

  async delete<T>(req: NextRequest) {
    return this.request<T>(req, "DELETE");
  }
}

// 싱글톤 인스턴스
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_SERVER_URL!);
export default apiClient;
