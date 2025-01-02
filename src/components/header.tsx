import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { CardWidget } from "./card/card-widget";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>

        <form className="flex w-[320px] item-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
          <Search className="w-6 h-6v text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar produtos"
            className="w-full bg-transparent text-white text-sm placeholder-zinc-500 focus:outline-none"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <CardWidget />

        <div className="w-px h-4 bg-zinc-700" />

        <Link href="/login" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            src="https://github.com/vicnuel.png"
            alt="Victor Nuel"
            className="rounded-full h-7 w-7"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
}
