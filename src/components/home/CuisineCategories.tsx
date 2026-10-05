import { cuisines } from "@/utils/items";
import { MenuCard } from "@/utils/MenuCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CuisineCategories = () => {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
          Explore flavours around the world
        </h2>

        <Link
          to="/cuisines"
          className="group inline-flex shrink-0 items-center gap-2
      text-sm font-medium text-gray-600
      transition-colors duration-200
      hover:text-orange-500
      focus-visible:rounded-sm
      focus-visible:outline-2
      focus-visible:outline-offset-4
      focus-visible:outline-orange-500"
        >
          <span>View all</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

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
