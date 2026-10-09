import { Check } from "lucide-react";

export type RecipeIngredient = {
  id: number;
  quantity: string | null;
  quantityText: string | null;
  unit: string | null;
  preparation: string | null;
  ingredient: {
    id: number;
    name: string;
    image: string | null;
  };
};

type RecipeIngredientsProps = {
  ingredients: RecipeIngredient[];
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
    <div className="flex flex-1 flex-col">
      <div>
        {ingredients.map((item) => {
          const quantity =
            item.quantity !== null
              ? Number((Number(item.quantity) * multiplier).toFixed(2))
              : undefined;

          const amount =
            quantity !== undefined
              ? `${quantity}${item.unit ? ` ${item.unit}` : ""}`
              : (item.quantityText ?? "");

          return (
            <label
              key={item.id}
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
                <div className="flex min-w-0 gap-1 md:gap-2">
                  <span className="text-gray-800">
                    {item.ingredient.name}
                  </span>

                  {item.preparation && (
                    <p className="mt-1 text-xs text-gray-500">
                      ({item.preparation})
                    </p>
                  )}
                </div>

                <span className="shrink-0 text-gray-600">{amount}</span>
              </div>
            </label>
          );
        })}
      </div>

      <p className="mt-auto pt-8 text-sm leading-relaxed text-gray-500">
        Ingredient amounts scale with servings. Cooking times stay the same.
      </p>
    </div>
  );
}