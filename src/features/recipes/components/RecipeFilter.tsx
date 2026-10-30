import { useId, useState } from "react";
import type { filter } from "@/type/recipes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CUISINE_LIMIT = 6;

const FormSchema = z.object({
  meals: z.array(z.string()),
  cuisines: z.array(z.string()),
  totalTime: z.string(),
  diet: z.array(z.string()),
});

export type FilterValues = z.infer<typeof FormSchema>;

interface FilterProps {
  filterList: {
    meals: filter[];
    totalTime: filter[];
    cuisines: filter[];
    diet: filter[];
  };
  defaultValues?: FilterValues;
  onApply?: (values: FilterValues) => void;
}

type FilterGroup =
  | {
      name: "meals" | "cuisines" | "diet";
      title: string;
      type: "checkbox";
    }
  | {
      name: "totalTime";
      title: string;
      type: "radio";
    };

const FILTER_GROUPS: FilterGroup[] = [
  { name: "meals", title: "Meal", type: "checkbox" },
  { name: "totalTime", title: "Total time", type: "radio" },
  { name: "cuisines", title: "Cuisine", type: "checkbox" },
  { name: "diet", title: "Diet", type: "checkbox" },
];

function RecipesFilter({ filterList, defaultValues, onApply }: FilterProps) {
  const instanceId = useId();

  const [showAllCuisines, setShowAllCuisines] = useState(false);

  const form = useForm<FilterValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues ?? {
      meals: [],
      cuisines: [],
      totalTime: "",
      diet: [],
    },
  });

  function onSubmit(data: FilterValues) {
    if (onApply) {
      onApply(data);
    } else {
      console.log("submit:", data);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full min-w-0 self-start rounded-2xl border border-gray-200 p-4"
    >
      <div className="divide-y divide-gray-200">
        {FILTER_GROUPS.map((group) => {
          const errorId = `${instanceId}-${group.name}-error`;

          return (
            <div key={group.name} className="py-5 first:pt-0 last:pb-0">
              {group.type === "radio" ? (
                <Controller
                  control={form.control}
                  name={group.name}
                  render={({ field, fieldState }) => (
                    <fieldset className="min-w-0">
                      <legend className="mb-3 text-sm font-semibold text-gray-950">
                        {group.title}
                      </legend>

                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        aria-invalid={fieldState.invalid}
                        aria-describedby={
                          fieldState.invalid ? errorId : undefined
                        }
                        className="gap-1"
                      >
                        {[
                          { id: "", label: "Any time" },
                          ...filterList.totalTime,
                        ].map((item, index) => {
                          const value = String(item.id);
                          const isChecked = field.value === value;
                          const radioId = `${instanceId}-${group.name}-${index}`;

                          return (
                            <Field
                              key={value}
                              orientation="horizontal"
                              data-invalid={fieldState.invalid}
                              className={`relative min-h-8 items-center gap-2 rounded-lg px-1.5 py-1 transition-colors ${
                                isChecked ? "bg-orange-50" : "hover:bg-gray-50"
                              }`}
                            >
                              <RadioGroupItem
                                id={radioId}
                                value={value}
                                ref={index === 0 ? field.ref : undefined}
                                className="size-4 shrink-0 border-gray-300 text-orange-500 shadow-none data-[state=checked]:border-orange-500 data-checked:border-orange-500"
                              />

                              <FieldLabel
                                htmlFor={radioId}
                                className={`min-w-0 flex-1 cursor-pointer text-sm leading-5 font-normal after:absolute after:inset-0 after:content-[''] ${
                                  isChecked
                                    ? "text-orange-700"
                                    : "text-gray-600"
                                }`}
                              >
                                {item.label}
                              </FieldLabel>
                            </Field>
                          );
                        })}
                      </RadioGroup>

                      {fieldState.invalid && (
                        <FieldError
                          id={errorId}
                          errors={[fieldState.error]}
                          className="mt-2 text-xs"
                        />
                      )}
                    </fieldset>
                  )}
                />
              ) : (
                <Controller
                  control={form.control}
                  name={group.name}
                  render={({ field, fieldState }) => {
                    const items =
                      group.name === "cuisines" && !showAllCuisines
                        ? filterList.cuisines.slice(0, CUISINE_LIMIT)
                        : filterList[group.name];

                    const remainingCuisines = Math.max(
                      0,
                      filterList.cuisines.length - CUISINE_LIMIT,
                    );

                    return (
                      <fieldset className="min-w-0">
                        <legend className="mb-3 text-sm font-semibold text-gray-950">
                          {group.title}
                        </legend>

                        <div className="space-y-1">
                          {items.map((item, index) => {
                            const value = String(item.id);
                            const isChecked = field.value.includes(value);

                            const checkboxId = `${instanceId}-${group.name}-${index}`;

                            return (
                              <Field
                                key={value}
                                orientation="horizontal"
                                data-invalid={fieldState.invalid}
                                className={`relative min-h-8 items-center gap-2 rounded-lg px-1.5 py-1 transition-colors ${
                                  isChecked
                                    ? "bg-orange-50"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <Checkbox
                                  id={checkboxId}
                                  name={field.name}
                                  value={value}
                                  ref={index === 0 ? field.ref : undefined}
                                  checked={isChecked}
                                  onBlur={field.onBlur}
                                  aria-invalid={fieldState.invalid}
                                  aria-describedby={
                                    fieldState.invalid ? errorId : undefined
                                  }
                                  className="size-4 shrink-0 rounded border-gray-300 shadow-none data-checked:border-orange-500 data-checked:bg-orange-500 data-checked:text-white data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                                  onCheckedChange={(checked) => {
                                    const remaining = field.value.filter(
                                      (selected) => selected !== value,
                                    );

                                    field.onChange(
                                      checked === true
                                        ? [...remaining, value]
                                        : remaining,
                                    );
                                  }}
                                />

                                <FieldLabel
                                  htmlFor={checkboxId}
                                  className={`min-w-0 flex-1 cursor-pointer text-sm leading-5 font-normal after:absolute after:inset-0 after:content-[''] ${
                                    isChecked
                                      ? "text-orange-700"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {item.label}
                                </FieldLabel>
                              </Field>
                            );
                          })}
                        </div>

                        {/* Cuisine Show More / Show Less */}
                        {group.name === "cuisines" && remainingCuisines > 0 && (
                          <button
                            type="button"
                            aria-expanded={showAllCuisines}
                            onClick={() => setShowAllCuisines((prev) => !prev)}
                            className="mt-3 cursor-pointer text-sm font-medium text-orange-500 transition-colors hover:text-orange-600"
                          >
                            {showAllCuisines
                              ? "Show less"
                              : `Show more (${remainingCuisines})`}
                          </button>
                        )}

                        {fieldState.invalid && (
                          <FieldError
                            id={errorId}
                            errors={[fieldState.error]}
                            className="mt-2 text-xs"
                          />
                        )}
                      </fieldset>
                    );
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Apply Filters */}
      <div className="mt-5 border-t border-gray-200 pt-4">
        <Button
          type="submit"
          className="h-10 w-full rounded-lg bg-orange-500 text-sm font-medium text-white shadow-none hover:bg-orange-600"
        >
          Apply filters
        </Button>
      </div>
    </form>
  );
}

export default RecipesFilter;
