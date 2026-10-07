import { Clock, Users } from "lucide-react";

type RecipeStatsProps = {
  prepTime: number;
  cookTime: number;
  servings: number;
};

export function RecipesDetailStats({
  prepTime,
  cookTime,
  servings,
}: RecipeStatsProps) {
  const stats = [
    { label: "Prep time", value: `${prepTime} min`, icon: Clock },
    { label: "Cook time", value: `${cookTime} min`, icon: Clock },
    {
      label: "Original recipe",
      value: `${servings} ${servings === 1 ? "serving" : "servings"}`,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 divide-y divide-gray-300 rounded-2xl border border-gray-100 bg-white py-2 shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-5">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-4 px-6 py-4 sm:py-0 lg:px-8"
        >
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-orange-50">
            <Icon aria-hidden="true" className="size-6 text-orange-500" />
          </div>

          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-lg font-semibold text-gray-950">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
