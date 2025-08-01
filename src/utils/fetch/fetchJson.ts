// utils/fetch/fetchJson.ts

export async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const { body, headers = {}, method = 'GET', ...rest } = options;

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);

  const contentType = res.headers.get('Content-Type');
  const isJson = contentType?.includes('application/json');

  if (!res.ok) {
    const errorData = isJson ? await res.json() : await res.text();
    throw new Error(`Fetch error: ${res.status} ${res.statusText}\n${JSON.stringify(errorData)}`);
  }

  return isJson ? res.json() : (res.text() as unknown as T);
}
