import { cuisines } from "@/utils/Homeitems";
import { MenuCard } from "@/utils/MenuCard";

export const CuisineCategories = () => {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <h2 className="mb-5 text-2xl font-bold text-gray-950">
        Explore flavours around the world
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cuisines.map((cuisine) => (
          <MenuCard
            key={cuisine.cuisine}
            title={cuisine.title}
            image={cuisine.image}
            to={`/recipes?cuisine=${cuisine.cuisine}`}
          />
        ))}
      </div>
    </section>
  );
};
