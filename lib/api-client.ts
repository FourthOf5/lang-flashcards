const readResponse = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "The request could not be completed.");
  }

  return data;
};

export const getJson = async <T>(url: string): Promise<T> =>
  readResponse<T>(await fetch(url, { cache: "no-store" }));

export const sendJson = async <T>(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<T> =>
  readResponse<T>(
    await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    }),
  );
