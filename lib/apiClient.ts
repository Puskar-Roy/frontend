
export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
  withAuth?: boolean; 
}

const handleResponse = async (res: Response) => {
  const data = await res.json();

  if (!res.ok || data.status === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const createAPIClient = (getToken: () => string | null) => {
  const request = async (
    method: HttpMethod,
    url: string,
    options: RequestOptions = {}
  ) => {
    const { headers = {}, body, withAuth = true } = options;

    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

  
    if (withAuth && url !== "/api/v1/auth/login") {
      const token = getToken();
      if (token) {
        finalHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(`${API_BASE}${url}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse(res);
  };

  return {
    GET: (url: string, options?: RequestOptions) =>
      request("GET", url, options),
    POST: (url: string, body?: any, options?: RequestOptions) =>
      request("POST", url, { ...options, body }),
    PUT: (url: string, body?: any, options?: RequestOptions) =>
      request("PUT", url, { ...options, body }),
    DELETE: (url: string, options?: RequestOptions) =>
      request("DELETE", url, options),
  };
};
