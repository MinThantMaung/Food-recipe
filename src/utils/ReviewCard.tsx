import type { Review } from "@/features/recipes/components/detail/RecipesReview";
import { Star } from "lucide-react";

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const fullname = review.user.firstName + review.user.lastName;
  return (
    <article className="flex items-start gap-3 border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0 md:gap-4">
      {/* Avatar */}
      <img
        src={review.user.image}
        alt={fullname}
        loading="lazy"
        className="size-10 shrink-0 rounded-full object-cover md:size-14"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          {/* Name and Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-950">{fullname}</span>

            <div
              className="flex items-center gap-1"
              aria-label={`Rated ${review.rating} out of 5`}
            >
              {Array.from({ length: 5 }, (_, index) => {
                const fill = Math.max(0, Math.min(1, review.rating - index));

                return (
                  <span
                    key={index}
                    className="relative size-4"
                    aria-hidden="true"
                  >
                    <Star className="absolute inset-0 size-4 text-gray-300" />

                    <span
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${fill * 100}%` }}
                    >
                      <Star className="size-4 fill-orange-500 text-orange-500" />
                    </span>
                  </span>
                );
              })}

              <span className="ml-2 text-sm font-semibold text-gray-700">
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Date */}
          <time className="text-sm text-gray-500">{review.updateAt}</time>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
          {review.comment}
        </p>
      </div>
    </article>
  );
};
