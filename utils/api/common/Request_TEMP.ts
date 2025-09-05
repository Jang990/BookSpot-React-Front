import {
  ApiError,
  ClientError,
  UnauthorizedError,
  RateLimitError,
  ServerError,
} from "./Errors";
import { auth } from "@/auth";

type RequestResult<T> =
  | { ok: true; status: number; data?: T }
  | { ok: false; status: number; error: ApiError };

const DEFAULT_TIMEOUT = 8000;

async function safeParseBody(res: Response): Promise<any | undefined> {
  const txt = await res.text().catch(() => "");
  if (!txt) return undefined;
  try {
    return JSON.parse(txt);
  } catch {
    return txt;
  }
}

export type Side = "server" | "client";
export class ApiClient {
  private baseUrl: string;
  private side: Side;

  constructor(baseUrl: string, side: Side) {
    this.baseUrl = baseUrl;
    this.side = side;
  }

  private async fetchWithAuth<T>(
    path: string,
    init: RequestInit = {},
    timeoutMs = DEFAULT_TIMEOUT
  ): Promise<RequestResult<T>> {
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers = new Headers(init.headers ?? {});
      headers.set("Content-Type", "application/json");

      if (this.side === "server") {
        const session = await auth();
        const token = session?.backendToken;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      const res = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers,
        signal,
        credentials: "include",
      });

      const body = await safeParseBody(res);

      if (res.ok) {
        return { ok: true, status: res.status, data: body as T };
      }

      if (res.status === 401) {
        return {
          ok: false,
          status: res.status,
          error: new UnauthorizedError(body),
        };
      }
      if (res.status === 429) {
        const ra = res.headers.get("retry-after") ?? undefined;
        return {
          ok: false,
          status: res.status,
          error: new RateLimitError(body, ra),
        };
      }
      if (res.status >= 400 && res.status < 500) {
        return { ok: false, status: res.status, error: new ClientError(body) };
      }
      return { ok: false, status: res.status, error: new ServerError(body) };
    } catch (err: any) {
      if (err.name === "AbortError") {
        return {
          ok: false,
          status: 0,
          error: new ServerError({ message: "Timeout" }),
        };
      }
      return {
        ok: false,
        status: 0,
        error: new ServerError({
          message: err?.message ?? "Unknown fetch error",
        }),
      };
    } finally {
      clearTimeout(timer);
    }
  }

  get<T = any>(path: string, timeoutMs?: number) {
    return this.fetchWithAuth<T>(path, { method: "GET" }, timeoutMs);
  }

  post<T = any>(path: string, body?: any, timeoutMs?: number) {
    return this.fetchWithAuth<T>(
      path,
      {
        method: "POST",
        body: body === undefined ? undefined : JSON.stringify(body),
      },
      timeoutMs
    );
  }
}

export const ssrApiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_SERVER_URL!,
  "server"
);
export const csrApiClient = new ApiClient(
  process.env.NEXT_PUBLIC_FRONT_SERVER_URL!,
  "client"
);
