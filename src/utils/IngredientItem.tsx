import { Check } from "lucide-react";

export type Ingredient = {
  id: number;
  name: string;
  quantity?: number;
  unit?: string;
  note?: string;
};

type RecipeIngredientsProps = {
  ingredients: Ingredient[];
  serving: number;
  originalServings: number;
};

export function RecipeIngredients({
  ingredients,
  serving,
  originalServings,
}: RecipeIngredientsProps) {
  const multiplier = serving / originalServings;

  return (
    <div>
      {ingredients.map((ingredient) => {
        const quantity =
          ingredient.quantity !== undefined
            ? Number((ingredient.quantity * multiplier).toFixed(2))
            : undefined;

        return (
          <label
            key={ingredient.id}
            className="flex cursor-pointer items-start gap-2"
          >
            <span className="relative mt-4 size-4 shrink-0">
              <input
                type="checkbox"
                className="peer size-4 appearance-none rounded border border-gray-300 bg-white checked:border-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              />

              <Check
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden size-4 text-orange-500 peer-checked:block"
                strokeWidth={3}
              />
            </span>

            <div className="flex min-w-0 flex-1 justify-between gap-4 border-b border-gray-100 py-3 text-sm sm:text-base">
              <span className="text-gray-800">{ingredient.name}</span>

              <span className="shrink-0 text-gray-600">
                {quantity !== undefined
                  ? `${quantity}${ingredient.unit ? ` ${ingredient.unit}` : ""}`
                  : ingredient.note}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
