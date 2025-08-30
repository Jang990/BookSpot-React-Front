export async function get(api: string) {
  return await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    if (500 <= response.status) throw new ServerError();
    throw new ClientError();
  });
}

export async function post(api: string) {
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    if (500 <= response.status) throw new ServerError();
    throw new ClientError();
  });
}

export class ServerError extends Error {
  constructor(message = "Server Error") {
    super(message);
    this.name = "ServerError";
  }
}

export class ClientError extends Error {
  constructor(message = "Server Error") {
    super(message);
    this.name = "ClientError";
  }
}
