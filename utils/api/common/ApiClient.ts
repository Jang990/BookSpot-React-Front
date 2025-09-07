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

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(session?.backendToken
            ? { Authorization: `Bearer ${session.backendToken}` }
            : {}),
        },
        signal: controller.signal,
      });

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
