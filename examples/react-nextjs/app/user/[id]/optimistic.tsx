"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useOptimistic,
} from "react";

interface User {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContextType {
  optimistic: User;
  updateOptimistic: (_: User) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export function OptimisticProvider({
  user,
  children,
}: PropsWithChildren<{ user: User }>) {
  const [optimistic, updateOptimistic] = useOptimistic(user);
  const value = { optimistic, updateOptimistic };

  return <Context value={value}>{children}</Context>;
}

export function useOptimisticContext() {
  const context = useContext(Context);

  const message = "Context must be used within provider";
  if (typeof context === "undefined") throw new Error(message);

  return context;
}
