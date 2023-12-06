import { Navbar } from "./navbar";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="flex w-full flex-col items-stretch justify-start gap-4 bg-vibrant-blue py-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-row items-center justify-between px-4">
        <Navbar />
        <UserMenu />
      </div>
    </header>
  );
}
