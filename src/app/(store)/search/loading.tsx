import { Skeleton } from "@/components/skeleton";
import CurrentSearch from "./current-search";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <CurrentSearch />
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
      </div>
    </div>
  );
}
