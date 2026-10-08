import { RecipeIngredients } from "@/features/recipes/components/detail/RecipeIngredients";
import { ingredients, instructions } from "@/utils/items";
import { ButtonGroupSplit } from "@/features/recipes/components/detail/ServingButton";
import { RecipesInstructions } from "@/features/recipes/components/detail/RecipesInstructions";

type RecipesDetailsInstructionProps = {
  serving: number;
  originalServing: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onServingChange: (value: number) => void;
};

export function RecipesDetailsInstruction({
  serving,
  originalServing,
  onIncrease,
  onDecrease,
  onServingChange,
}: RecipesDetailsInstructionProps) {
  const isAdjusted = serving !== originalServing;
  const handleReset = () => {
    onServingChange(originalServing);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-4 md:p-6">
        <h2 className="font-bold text-xl md:text-2xl tracking-tight">
          Ingredients
        </h2>
        <div className="flex justify-between items-center py-2 md:py-4">
          <div className="font-bold tracking-tight">Servings</div>
          <ButtonGroupSplit
            serving={serving}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onServingChange={onServingChange}
          />
        </div>
        {isAdjusted && (
          <div className="w-full rounded-md bg-orange-100 p-3 md:p-4">
            <p className="font-semibold text-orange-600">
              Amounts adjusted for {serving} servings
            </p>

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                Original recipe serves {originalServing}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="shrink-0 cursor-pointer text-sm font-semibold text-orange-600 underline hover:text-orange-800"
              >
                Reset
              </button>
            </div>
          </div>
        )}
        <RecipeIngredients
          ingredients={ingredients}
          serving={serving}
          originalServings={originalServing}
        />
      </div>
      <div className="rounded-xl border border-gray-100 bg-white p-4 md:p-6">
        <h2 className="font-bold text-xl md:text-2xl tracking-tight">
          Instruction
        </h2>
        <RecipesInstructions instructions={instructions} />
      </div>
    </div>
  );
}
