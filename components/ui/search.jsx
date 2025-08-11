"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function InputWithButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("s") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("s", search);
      } else {
        params.delete("s");
      }
      router.replace(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [search, searchParams, router]);

  return (
    <div className="flex items-center space-x-2 relative max-w-xl glass-border">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-3xl"
        type="text"
        placeholder="Search ..."
      />
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="flex absolute rounded-full !bg-transparent right-0 top-0 items-center justify-center h-9 w-9"
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
