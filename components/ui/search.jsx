import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function InputWithButton() {
  let [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("searchText", search);
    }
    redirect(`/search`);
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
