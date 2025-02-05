import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function InputWithButton() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("searchText") || "");
  }, [searchParams]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    redirect(`/search?searchText=${search}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 relative max-w-xl"
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-3xl bg-gray-200"
        type="text"
        placeholder="Search ..."
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        type="submit"
        className="flex absolute rounded-full  right-0 top-0 items-center justify-center h-9 w-9"
      >
        <SearchIcon />
      </Button>
    </form>
  );
}
