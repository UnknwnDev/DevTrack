import type { User } from "@/features/auth/types";
import { ApiClient } from "@/lib/api/types";

export interface RegisterResponse {
  message: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  name?: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  message: string;
  user: User;
}

export async function loginUser(
  apiClient: ApiClient,
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("grand_type", "password");
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);

  const data = await apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: formData.toString(),
  });

  console.log(data);
  return data;
}

export async function signInUser(
  apiClient: ApiClient,
  credentials: LoginCredentials,
): Promise<RegisterResponse> {
  const data = await apiClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  console.log(data);
  return data;
}
