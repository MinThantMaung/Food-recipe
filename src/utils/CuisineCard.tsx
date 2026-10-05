
import { Link } from "react-router-dom";

type CuisineCardProps = {
  title: string;
  description: string;
  image: string;
  to: string;
};

export const CuisineCard = ({
  title,
  description,
  image,
  to,
}: CuisineCardProps) => {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-xl
        border border-gray-100 bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-orange-500"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover
            transition-transform duration-300
            motion-safe:group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-1 p-4">
        <h3
          className="text-lg font-bold text-gray-950
            transition-colors group-hover:text-orange-600"
        >
          {title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
};
