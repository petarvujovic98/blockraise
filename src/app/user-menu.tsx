"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";
import { useAccountId } from "~/stores/global";
import { api } from "~/trpc/react";
import { Icon } from "~/components/icon";

export function UserMenu() {
  const accountId = useAccountId();
  const { data } = api.near.profile.useQuery({
    account_id: accountId ?? "social.near",
  });

  if (!accountId) {
    return <SignIn />;
  }

  return (
    <div className="flex flex-row items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center justify-between gap-2 p-2 focus-visible:ring-0">
          <Icon
            name={accountId}
            image={data?.image}
            className="h-8 w-8 rounded-full"
          />
          My profile
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <UserMenuItem
            href="/campaigns/create"
            text="Create campaign"
            disabled={false}
          />
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function UserMenuItem({
  href,
  text,
  disabled = false,
}: {
  href: string;
  text: string;
  disabled: boolean;
}) {
  return (
    <DropdownMenuItem disabled={disabled}>
      <Link href={href}>{text}</Link>
    </DropdownMenuItem>
  );
}
