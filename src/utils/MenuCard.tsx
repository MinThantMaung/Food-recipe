import { Link } from "react-router-dom";

type MealCardProps = {
  title: string;
  image: string;
  to: string;
};

export const MenuCard = ({ title, image, to }: MealCardProps) => {
  return (
    <Link
      to={to}
      className="group relative isolate block h-40 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 sm:h-48 lg:h-52"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-linear-to-t from-black/75 via-black/10 to-transparent"
      />

      <h3 className="absolute bottom-3 left-4 right-4 z-20 text-lg font-bold text-white sm:text-xl">
        {title}
      </h3>
    </Link>
  );
};