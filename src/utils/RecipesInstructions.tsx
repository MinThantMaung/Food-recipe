export type Instruction = {
  id: number;
  step: number;
  title: string;
  description: string;
};

type RecipesInstructionsProps = {
  instructions: Instruction[];
};

export function RecipesInstructions({
  instructions,
}: RecipesInstructionsProps) {
  return (
    <ol>
      {instructions.map((instruction) => {
        return (
          <li
            key={instruction.id}
            className="flex items-start gap-3 border-b border-gray-100 py-5 last:border-b-0 last:pb-0 md:gap-4"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white md:size-10 md:text-base">
              {instruction.step}
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
              <h3 className="font-bold tracking-tight text-gray-800 md:text-lg">
                {instruction.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                {instruction.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
