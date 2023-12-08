import Image from "next/image";
import { UserMenu } from "./user-menu";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex w-full flex-col items-stretch justify-start gap-4 bg-soft-light-blue py-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-4">
        <Link
          className="flex flex-row items-center justify-start gap-2"
          href="/"
        >
          <Image
            src="/blockraise.png"
            alt="BlockRaise"
            unoptimized
            width={60}
            height={60}
            className="rounded-full"
          />
          <b className="text-5xl font-bold text-deep-navy-blue">BlockRaise</b>
        </Link>
        <UserMenu />
      </div>
    </header>
  );
}
