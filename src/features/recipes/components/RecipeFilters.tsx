
import { recipeFilters } from "@/utils/items";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type RecipeFiltersProps = {
  searchParams: URLSearchParams;
  onFilterChange: (
    filterId: string,
    value: string,
    checked: boolean,
  ) => void;
};

export function RecipeFilters({
  searchParams,
  onFilterChange,
}: RecipeFiltersProps) {
  return (
    <aside
      aria-label="Recipe filters"
      className="min-w-0 lg:self-start"
    >
      <div className="space-y-6 rounded-xl border p-5">
        {recipeFilters.map((filter, index) => (
          <div
            key={filter.id}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold">
              {filter.title}
            </h3>

            <div className="space-y-3">
              {filter.options.map((option) => {
                const isChecked = searchParams
                  .getAll(filter.id)
                  .some(
                    (value) =>
                      value.toLowerCase() ===
                      option.value.toLowerCase(),
                  );

                return (
                  <div
                    key={option.value}
                    className="flex items-center gap-3"
                  >
                    <Checkbox
                      id={`${filter.id}-${option.value}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        onFilterChange(
                          filter.id,
                          option.value,
                          checked === true,
                        )
                      }
                    />

                    <Label
                      htmlFor={`${filter.id}-${option.value}`}
                      className="cursor-pointer font-normal text-muted-foreground"
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>

            {index < recipeFilters.length - 1 && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
