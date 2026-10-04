import { meals } from "@/utils/Homeitems";
import { MenuCard } from "@/utils/MenuCard";

export const MealCategories = () => {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <h2 className="mb-5 text-2xl font-bold text-gray-950">
        Find your kind of meal
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {meals.map((meal) => (
          <MenuCard
            key={meal.category}
            title={meal.title}
            image={meal.image}
            to={`/recipes?category=${meal.category}`}
          />
        ))}
      </div>
    </section>
  );
};
