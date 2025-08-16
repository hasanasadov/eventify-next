"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/constants/paths";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function InputWithButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("s") || "");

  const isSearchPage = pathname === paths.SEARCH;

  // Sync search term with URL only when on search page
  useEffect(() => {
    if (!isSearchPage) return;

    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (search.trim()) {
        params.set("s", search.trim());
      } else {
        params.delete("s");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(handler);
  }, [search, isSearchPage, pathname, router]);

  return (
    <div className="flex items-center relative max-w-xl glasss w-full overflow-hidden">
      {/* Only show input on search page */}
      {isSearchPage && (
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" min-w-[200px] w-full bg-transparent border-0 focus-visible:outline-none focus-visible:ring-0"
          type="text"
          placeholder="Search ..."
        />
      )}

      {/* If not on search page → clicking button goes to /search?s=term */}
      {isSearchPage ? (
        <Button variant="glass">
          <SearchIcon size={24} />
        </Button>
      ) : (
        <Link
          href={
            search.trim()
              ? `${paths.SEARCH}?s=${encodeURIComponent(search.trim())}`
              : paths.SEARCH
          }
          className="flex items-center !font-bold"
        >
          <Button variant="glass">
            <SearchIcon size={24} />
          </Button>
        </Link>
      )}
    </div>
  );
}
