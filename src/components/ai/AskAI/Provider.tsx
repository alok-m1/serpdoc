"use client";
import type { ReactNode } from "react";
import { AISearchProvider } from "./context";

export function AISearch({ children }: { children: ReactNode }) {
  return <AISearchProvider>{children}</AISearchProvider>;
}
