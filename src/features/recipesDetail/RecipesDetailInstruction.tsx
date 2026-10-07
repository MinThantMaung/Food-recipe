import { RecipeIngredients } from "@/utils/RecipeIngredients";
import { ingredients, instructions } from "@/utils/items";
import { ButtonGroupSplit } from "@/utils/ServingButton";
import { RecipesInstructions } from "@/utils/RecipesInstructions";

type RecipesDetailsInstructionProps = {
  serving: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onServingChange: (value: number) => void;
};

export function RecipesDetailsInstruction({
  serving,
  onIncrease,
  onDecrease,
  onServingChange,
}: RecipesDetailsInstructionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-4 md:p-6">
        <div className="font-bold text-xl md:text-2xl tracking-tight">
          Ingredients
        </div>
        <div className="flex justify-between items-center py-2 md:py-4">
          <div className="font-bold tracking-tight">Servings</div>
          <ButtonGroupSplit
            serving={serving}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onServingChange={onServingChange}
          />
        </div>
        <RecipeIngredients
          ingredients={ingredients}
          serving={serving}
          originalServings={2}
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
