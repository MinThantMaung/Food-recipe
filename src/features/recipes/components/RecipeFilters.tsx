import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { RecipeFilterOptions } from "../types";

type RecipeFiltersProps = RecipeFilterOptions & {
  searchParams: URLSearchParams;
  onFilterChange: (filterId: string, value: string, checked: boolean) => void;
};

// type RecipeFiltersProps = {
//   searchParams: URLSearchParams;
//   onFilterChange: (
//     filterId: string,
//     value: string,
//     checked: boolean,
//   ) => void;
// };

export type FilterGroup = {
  id: string;
  title: string;
  options: {
    label: string;
    value: string;
  }[];
};

const VISIBLE_OPTIONS_COUNT = 6;

export function RecipeFilters({
  searchParams,
  onFilterChange,
  cuisines,
  meals,
  diets,
}: RecipeFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState<
    Record<string, boolean>
  >({});

  const filters: FilterGroup[] = [
    {
      id: "meal",
      title: "Meal",
      options: meals.map((meal) => ({
        label: meal.name,
        value: String(meal.name),
      })),
    },
    {
      id: "totalTime",
      title: "Total time",
      options: [
        { label: "Under 15 minutes", value: "under-15" },
        { label: "Under 30 minutes", value: "under-30" },
        { label: "30–60 minutes", value: "30-60" },
        { label: "Over 60 minutes", value: "over-60" },
      ],
    },
    {
      id: "cuisine",
      title: "Cuisine",
      options: cuisines.flatMap((cuisine) =>
        cuisine.cuisineName
          ? [
              {
                label: cuisine.cuisineName,
                value: cuisine.cuisineName,
              },
            ]
          : [],
      ),
    },
    {
      id: "diet",
      title: "Diet",
      options: diets.map((diet) => ({
        label: diet.name,
        value: String(diet.name),
      })),
    },
  ];

  const toggleExpanded = (filterId: string) => {
    setExpandedFilters((previous) => ({
      ...previous,
      [filterId]: !previous[filterId],
    }));
  };

  return (
    <aside aria-label="Recipe filters" className="min-w-0 lg:self-start">
      <div className="space-y-6 rounded-xl border p-5">
        {filters.map((filter, index) => {
          const isExpanded = expandedFilters[filter.id] ?? false;

          const visibleOptions = isExpanded
            ? filter.options
            : filter.options.slice(0, VISIBLE_OPTIONS_COUNT);

          const hiddenCount = filter.options.length - VISIBLE_OPTIONS_COUNT;

          const optionsId = `filter-options-${filter.id}`;

          return (
            <div key={filter.id} className="space-y-4">
              <h3 className="text-sm font-semibold">{filter.title}</h3>

              <div id={optionsId} className="space-y-3">
                {visibleOptions.map((option) => {
                  const checkboxId = `${filter.id}-${option.value}`;

                  const isChecked = searchParams
                    .getAll(filter.id)
                    .some(
                      (value) =>
                        value.toLowerCase() === option.value.toLowerCase(),
                    );

                  return (
                    <div
                      key={option.value}
                      className="flex min-w-0 items-start gap-3"
                    >
                      <Checkbox
                        id={checkboxId}
                        className="mt-0.5 shrink-0"
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
                        htmlFor={checkboxId}
                        className="min-w-0 cursor-pointer wrap-break-words font-normal leading-5 text-muted-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>

              {hiddenCount > 0 && (
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={optionsId}
                  onClick={() => toggleExpanded(filter.id)}
                  className="rounded-sm text-sm font-medium text-orange-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  {isExpanded ? "Show less" : `Show more (${hiddenCount})`}
                </button>
              )}

              {index < filters.length - 1 && <Separator className="mt-6" />}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
