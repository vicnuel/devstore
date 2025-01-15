"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CurrentSearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  return (
    <p className="text-sm">
      Resultados para: <span className="font-semibold">{query ?? ""}</span>
    </p>
  );
}

export default function CurrentSearch() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurrentSearchContent />
    </Suspense>
  );
}
