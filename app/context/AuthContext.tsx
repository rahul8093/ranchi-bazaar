"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  loading:boolean
}

const AuthCtx = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

 const refresh = async () => {
  setLoading(true);
  const res = await fetch("/api/auth/me", {
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  setUser(data.user ?? null);
  setLoading(false);
};


  useEffect(() => {
    // hydrate on load
    refresh();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true)
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setLoading(false)
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.[0]?.message || "Login failed");
    }

    await refresh(); // cookie set server-side; now hydrate user
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loginWithEmail, logout, refresh,loading }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
