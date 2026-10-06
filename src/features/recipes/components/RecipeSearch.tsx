
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type RecipeSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function RecipeSearch({
  value,
  onChange,
}: RecipeSearchProps) {
  return (
    <div className="mx-auto mb-8 w-full max-w-xl">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-gray-400"
        />

        <Input
          type="search"
          aria-label="Search recipes"
          placeholder="Search recipes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full rounded-full border
            border-gray-200 bg-white pr-5 pl-12
            text-sm shadow-sm
            placeholder:text-gray-400
            focus-visible:border-orange-400
            focus-visible:ring-2
            focus-visible:ring-orange-500/20
            sm:h-14 sm:text-base"
        />
      </div>
    </div>
  );
}
