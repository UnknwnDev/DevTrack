import { apiClient } from "@/lib/api/api";

export interface RegisterResponse {
  message: string;
  id: string;
}

interface LoginCredentials {
  email: string;
  name?: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  message: string;
}

export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("grand_type", "password");
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);

  const data = await apiClient<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: formData.toString(),
  });

  console.log(formData.toString());
  return data;
}

export async function signInUser(
  credentials: LoginCredentials,
): Promise<RegisterResponse> {
  const data = await apiClient<RegisterResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  console.log(data);
  return data;
}
