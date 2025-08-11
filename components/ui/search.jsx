import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function InputWithButton() {
  const [search, setSearch] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        searchParams.set("s", search);
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${searchParams}`
        );
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

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
        variant={"ghost"}
        size={"icon"}
        type="submit"
        className="flex absolute rounded-full !bg-transparent right-0 top-0 items-center justify-center h-9 w-9"
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
