export type ApiClient = <T>(
  endpoint: string,
  options?: RequestInit,
) => Promise<T>;
