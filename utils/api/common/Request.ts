import {
  ApiError,
  ClientError,
  UnauthorizedError,
  RateLimitError,
  ServerError,
} from "./Errors";

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

export async function request<T = any>(
  url: string,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT
): Promise<RequestResult<T>> {
  const controller = new AbortController();
  const signal = controller.signal;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal });
    const body = await safeParseBody(res);

    if (res.ok) {
      return { ok: true, status: res.status, data: body as T };
    }

    // Map status to errors
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
    // 5xx
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

// Convenience wrappers to keep existing call sites simple
export async function get<T = any>(url: string, timeoutMs?: number) {
  return request<T>(
    url,
    { method: "GET", headers: { "Content-Type": "application/json" } },
    timeoutMs
  );
}

export async function post<T = any>(
  url: string,
  body?: any,
  timeoutMs?: number
) {
  const init: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
  return request<T>(url, init, timeoutMs);
}
