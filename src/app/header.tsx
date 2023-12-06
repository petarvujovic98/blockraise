import Image from "next/image";
import { Navbar } from "./navbar";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="flex w-full flex-col items-stretch justify-start gap-4 bg-vibrant-blue py-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-4">
        <div className="flex flex-row items-center justify-start gap-2">
          <Image
            src="/blockraise.png"
            alt="BlockRaise"
            unoptimized
            width={60}
            height={60}
            className="rounded-full"
          />
          <b className="text-5xl font-bold text-deep-navy-blue">BlockRaise</b>
        </div>
        <Navbar />
        <UserMenu />
      </div>
    </header>
  );
}
