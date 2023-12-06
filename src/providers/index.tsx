"use client";

import { useWalletSelectorEffect } from "~/hooks/selector";
import { TRPCReactProvider } from "~/trpc/react";

export function Providers({
  children,
  cookies,
}: {
  children?: React.ReactNode;
  cookies: string;
}) {
  useWalletSelectorEffect();

  return <TRPCReactProvider cookies={cookies}>{children}</TRPCReactProvider>;
}
