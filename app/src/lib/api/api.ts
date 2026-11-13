const API_BASE_URL = "http://10.0.0.176:8000";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log("Hitting API:", url); // Helps you debug what URL is being called

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log(
      errorData.detail ||
        `API Error: ${response.status} ${response.statusText}`,
    );
    throw new Error(
      errorData.detail ||
        `API Error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
