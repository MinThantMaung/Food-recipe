import { MenuCard } from "@/utils/MenuCard";

export type RecipeCard = {
  id: number;
  name: string;
  image: string;
};

type mealsProps = {
  meals: RecipeCard[];
};

export const MealCategories = ({meals} : mealsProps) => {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <h2 className="mb-5 text-2xl font-bold text-gray-950">
        Find your kind of meal
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {meals.slice(0,4).map((meal) => (
          <MenuCard
            key={meal.id}
            title={meal.name}
            image={meal.image}
            to={`/recipes?meal=${encodeURIComponent(meal.name.toLowerCase())}`}
          />
        ))}
      </div>
    </section>
  );
};
