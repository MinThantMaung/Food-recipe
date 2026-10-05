
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";

type FoodCardProps = {
  title: string;
  image: string;
  to: string;
  duration: string;
  cuisine: string;
  rating: number;
  reviewCount?: number;
};

export const FoodCard = ({
  title,
  image,
  to,
  duration,
  cuisine,
  rating,
  reviewCount,
}: FoodCardProps) => {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-xl
        border border-gray-100 bg-white shadow-sm
        transition-shadow duration-300
        hover:shadow-md
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-orange-500"
    >
      {/* Food image */}
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover
            transition-transform duration-300
            motion-safe:group-hover:scale-105"
        />
      </div>

      {/* Card content */}
      <div className="space-y-3 p-4">
        <h3
          className="line-clamp-1 text-lg font-semibold
            text-gray-950 transition-colors
            group-hover:text-orange-600"
        >
          {title}
        </h3>

        {/* Cuisine and duration */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} className="shrink-0" />
          <span>
            {cuisine} · {duration}
          </span>
        </div>

        {/* Rating */}
        <div
          className="flex items-center gap-2"
          aria-label={`Rated ${safeRating.toFixed(1)} out of 5 stars${
            reviewCount !== undefined
              ? ` from ${reviewCount} reviews`
              : ""
          }`}
        >
          <div aria-hidden="true" className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="relative">
                <Star
                  size={16}
                  className="fill-gray-200 stroke-gray-200"
                />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(1, safeRating - index)
                    ) * 100}%`,
                  }}
                >
                  <Star
                    size={16}
                    className="fill-orange-500 stroke-orange-500"
                  />
                </span>
              </span>
            ))}
          </div>

          <span className="text-sm text-gray-500">
            {safeRating.toFixed(1)}
            {reviewCount !== undefined &&
              ` (${reviewCount})`}
          </span>
        </div>
      </div>
    </Link>
  );
};
