import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { useAuthUserStore } from "@/features/auth/stores/authUserStore";
import { ReviewCard } from "@/utils/ReviewCard";
import { cn } from "cn";
import { MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export type Review = {
  id: number;
  rating: number;
  comment: string;
  updateAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
};

type RecipesReviewsProps = {
  reviews: Review[];
};

export function RecipesReview({ reviews }: RecipesReviewsProps) {
  const user = useAuthUserStore((state) => state.user);
  const status = useAuthUserStore((state) => state.status);

  const [rating, setRating] = useState(0);
  return (
    <section className="w-full rounded-lg bg-white p-4 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Reviews
        </h2>

        {status === "loading" ? (
          <div className="size-9 animate-pulse rounded-full bg-gray-100" />
        ) : user ? (
          <></>
        ) : (
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-orange-500 text-orange-500",
            )}
          >
            Sign in
          </Link>
        )}
      </div>

      {status === "loading" ? (
        <div className="size-9 animate-pulse rounded-full bg-gray-100" />
      ) : user ? (
        <div className="my-6 space-y-5 rounded-xl border border-orange-100 bg-orange-50/50 p-4 md:p-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">
              How was this recipe?
            </h3>
            <p className="text-sm text-gray-500">
              Tried it? Share your tips and experience.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage
                src={user.image}
                alt={user.username || "Your profile"}
              />
              <AvatarFallback>
                {user.username?.trim().charAt(0).toUpperCase() || "F"}
              </AvatarFallback>
            </Avatar>

            <span className="text-sm font-medium text-gray-900">
              {user.username || "Anonymous User"}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Your rating</p>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  aria-label={`Rate ${index + 1} out of 5 stars`}
                  aria-pressed={rating === index + 1}
                  className="flex size-10 items-center justify-center rounded-md hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-orange-500"
                >
                  <Star
                    className={cn(
                      "size-6",
                      index < rating
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-400",
                    )}
                  />
                </button>
              ))}
              <div className="ml-4 md:ml-8">{rating} out of 5</div>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="recipe-review"
              className="block text-sm font-medium text-gray-700"
            >
              Your review
            </label>

            <textarea
              id="recipe-review"
              rows={4}
              placeholder="How did it turn out? Any tips or changes?"
              className="block w-full resize-y rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className={cn(
                buttonVariants(),
                "bg-orange-500 text-white hover:bg-orange-600",
              )}
            >
              Submit Review
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">
        Community Reviews
      </h2>
      <div className="my-2 flex flex-col md:my-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-orange-200 bg-orange-50/30 px-6 py-4 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-orange-100">
              <MessageSquare
                className="size-5 text-orange-500"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">
                Be the first to review
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                Tried this recipe? Share how it turned out and help others cook
                it.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
