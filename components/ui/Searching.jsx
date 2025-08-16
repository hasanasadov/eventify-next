import { Suspense } from "react";
import { InputWithButton } from "./search";

export const dynamic = "force-dynamic";

export default function Searching() {
  return (
    <Suspense fallback={<div className="glass p-2 whitespace-nowrap  mx-4">Loading search…</div>}>
      <InputWithButton />
    </Suspense>
  );
}
