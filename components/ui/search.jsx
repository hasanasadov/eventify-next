import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function InputWithButton() {
  return (
    <div className="flex items-center space-x-2 relative ">
      <Input className="rounded-3xl bg-gray-200" type="email" placeholder="Search ..." />
      <Button
        variant={"ghost"}
        size={"icon"}
        type="submit"
        className="flex absolute rounded-full  right-0 top-0 items-center justify-center h-9 w-9"
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
