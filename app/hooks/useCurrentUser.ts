'use client';

import { useAuth } from "../context/AuthContext";

// import { useAuth } from '@/context/AuthContext';

export const useCurrentUser = () => {
  const { user, loading,refresh,loginWithEmail,logout } = useAuth();
  return { user, loading,refresh,loginWithEmail,logout  };
};
