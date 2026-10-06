
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SORT_OPTIONS } from "../types";
import type { RecipeSort } from "../types";

type RecipeToolbarProps = {
  count: number;
  sortBy: RecipeSort;
  onSortChange: (value: RecipeSort) => void;
};

export function RecipeToolbar({
  count,
  sortBy,
  onSortChange,
}: RecipeToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-2xl font-bold tracking-tight">
        Recipes
      </h2>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="shrink-0 text-sm text-muted-foreground">
          {count} recipes
        </span>

        <Select
          value={sortBy}
          onValueChange={(value) => {
            const option = SORT_OPTIONS.find(
              (item) => item.value === value,
            );

            if (option) {
              onSortChange(option.value);
            }
          }}
        >
          <SelectTrigger
            aria-label="Sort recipes"
            className="w-44 bg-background"
          >
            <SelectValue placeholder="Sort recipes" />
          </SelectTrigger>

          <SelectContent align="end">
            {SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
