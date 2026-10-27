import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type RecipeSearchProps = {
  initialValue: string;
  onSearch: (value: string) => void;
};

export function RecipeSearch({
  initialValue,
  onSearch,
}: RecipeSearchProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <form
      role="search"
      className="mx-auto mb-8 w-full max-w-xl"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value.trim());
      }}
    >
      <div className="relative">
        <button
          type="submit"
          aria-label="Search recipes"
          className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500"
        >
          <Search aria-hidden="true" className="size-5" />
        </button>

        <Input
          type="search"
          aria-label="Search recipes"
          placeholder="Search recipes..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
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
    </form>
  );
}