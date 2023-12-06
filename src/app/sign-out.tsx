"use client";

import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useSignOut } from "~/stores/global";

export function SignOut() {
  const signOut = useSignOut();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>;
}
