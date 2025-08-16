import { Suspense } from "react";
import SearchResult from "./SearchResult";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="glass p-2 whitespace-nowrap  mx-4">Loading search…</div>
      }
    >
      <SearchResult />
    </Suspense>
  );
}
