type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function requestJsonAsync<T>(
  method: HttpMethod, url: string, body?: {}, bearerToken?: string
): Promise<T> {
  const response = await requestAsync(method, url, body, bearerToken);
  return await response.json();
}

export async function requestAsync(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: {},
  bearerToken?: string
): Promise<Response> {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  if (bearerToken != null) {
    headers.set('Authorization', `Bearer ${bearerToken}`);
  }
  const request: Request = new Request(
    `${url}`,
    {
      headers,
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined
    }
  );
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response;
}
