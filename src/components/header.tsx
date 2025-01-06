import Link from "next/link";

import Image from "next/image";
import { CardWidget } from "./card/card-widget";
import { SearchForm } from "./search-form";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>
        <SearchForm />
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
