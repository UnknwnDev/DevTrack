import { useCallback } from "react";
import { useSession } from "@/features/auth/auth-session";

const API_BASE_URL = "http://10.0.0.176:8000";
const VERSION_PREFIX = "/api/v1";

type TokenResponse = {
  access_token: string;
  token_type: string;
};

async function refreshAccessToken(
  refreshToken: string | null,
): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}${VERSION_PREFIX}/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  );

  console.log("refreshAccessToken: " + response);

  if (!response.ok) {
    throw new Error("Session expired. Please sign in again.");
  }

  const data: TokenResponse = await response.json();
  return data.access_token;
}

export function useApiClient() {
  const { accessToken, refreshToken, onAccessTokenUpdated } = useSession();

  return useCallback(
    async function apiClient<T>(
      endpoint: string,
      options: RequestInit = {},
    ): Promise<T> {
      const sendRequest = (token?: string | null) => {
        const headers = new Headers(options.headers);

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        return fetch(`${API_BASE_URL}${VERSION_PREFIX}${endpoint}`, {
          ...options,
          headers,
        });
      };

      let response = await sendRequest(accessToken);

      if (response.status === 401 && accessToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        onAccessTokenUpdated(newAccessToken);
        response = await sendRequest(newAccessToken);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
            `API Error: ${response.status} ${response.statusText}`,
        );
      }

      return response.json() as Promise<T>;
    },
    [accessToken, refreshToken, onAccessTokenUpdated],
  );
}
