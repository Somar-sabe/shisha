"use client";

import { Providers } from "@/store/provider";
import { CurrencyProvider } from "@/app/contexts/CurrencyContext";

export default function ClientProviders({ children }) {
  return (
    <Providers>
      <CurrencyProvider>{children}</CurrencyProvider>
    </Providers>
  );
}
