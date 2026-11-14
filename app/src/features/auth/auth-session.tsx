import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { User } from "@/features/auth/types";
import { appStorage } from "@/lib/storage/app-storage";

type StoredSession = {
  user: User;
  access_token: string;
  refresh_token: string;
};

type SessionContextValue = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isSignedIn: boolean;
  hasHydrated: boolean;
  onAccessTokenUpdated: (accessToken: string) => void;
  signIn: (refreshToken: string, accessToken: string, userData: User) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);
const sessionKey = "auth-session";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    appStorage.get<StoredSession | null>(sessionKey, null).then((session) => {
      setUser(session?.user ?? null);
      setAccessToken(session?.access_token ?? null);
      setRefreshToken(session?.refresh_token ?? null);
      setHasHydrated(true);
    });
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      accessToken,
      refreshToken,
      isSignedIn: Boolean(accessToken),
      hasHydrated,
      onAccessTokenUpdated: (accessToken: string) =>
        setAccessToken(accessToken),

      signIn(nextRefreshToken, nextAccessToken, userData) {
        const session = {
          user: userData,
          access_token: nextAccessToken,
          refresh_token: nextRefreshToken,
        };
        setUser(userData);
        setAccessToken(nextAccessToken);
        setRefreshToken(nextRefreshToken);
        void appStorage.set(sessionKey, session);
      },

      signOut() {
        setUser(null);
        setAccessToken(null);
        void appStorage.remove(sessionKey);
      },
    }),
    [user, accessToken, refreshToken, hasHydrated],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const value = useContext(SessionContext);

  if (!value) {
    throw new Error("useSession must be used inside SessionProvider");
  }

  return value;
}
