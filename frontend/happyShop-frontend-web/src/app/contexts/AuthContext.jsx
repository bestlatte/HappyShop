/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import {
  clearSession,
  getAccessToken,
  getStoredUser,
  saveSession,
} from "../../features/auth/utils/authStorage.js";

const AuthContext = createContext(null);
const DEV_MOCK_AUTH_ENABLED =
  import.meta.env.DEV &&
  String(import.meta.env.VITE_ENABLE_DEV_MOCK_AUTH).toLowerCase() === "true";

function getDevMockSession() {
  if (!DEV_MOCK_AUTH_ENABLED) return { token: null, user: null };

  return {
    token: "dev-mock-token",
    user: {
      name: import.meta.env.VITE_DEV_MOCK_USER_NAME ?? "測試會員",
      email: import.meta.env.VITE_DEV_MOCK_USER_EMAIL ?? "demo@happyshop.dev",
    },
  };
}

function normalizeLoginPayload(payload, fallbackEmail = "") {
  const token =
    payload?.accessToken ??
    payload?.token ??
    payload?.data?.accessToken ??
    payload?.data?.token ??
    null;

  const rawUser = payload?.user ?? payload?.data?.user ?? null;
  const user = rawUser
    ? {
        name: rawUser.name ?? rawUser.username ?? "會員",
        email: rawUser.email ?? fallbackEmail,
      }
    : fallbackEmail
      ? { name: fallbackEmail.split("@")[0], email: fallbackEmail }
      : null;

  return { token, user };
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    const storedToken = getAccessToken();
    if (storedToken) return storedToken;
    return getDevMockSession().token;
  });
  const [user, setUser] = useState(() => {
    const storedUser = getStoredUser();
    if (storedUser) return storedUser;
    return getDevMockSession().user;
  });

  const login = ({ payload, email = "" }) => {
    const normalized = normalizeLoginPayload(payload, email);
    if (!normalized.token) {
      return { ok: false, reason: "missing_token" };
    }

    saveSession(normalized);
    setAccessToken(normalized.token);
    setUser(normalized.user);

    return { ok: true };
  };

  const logout = () => {
    clearSession();
    setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken),
      login,
      logout,
    }),
    [user, accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
