'use client';

import { useAuth } from "../context/AuthContext";

// import { useAuth } from '@/context/AuthContext';

export const useCurrentUser = () => {
  const { user, loading } = useAuth();
  return { user, loading };
};
