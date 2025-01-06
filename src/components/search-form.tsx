"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const query = data.q as string;

    if (!query) {
      return;
    }

    router.push(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[320px] item-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-6 h-6v text-zinc-500" />
      <input
        type="text"
        defaultValue={query ?? ""}
        name="q"
        placeholder="Buscar produtos"
        className="w-full bg-transparent text-white text-sm placeholder-zinc-500 focus:outline-none"
      />
    </form>
  );
}
