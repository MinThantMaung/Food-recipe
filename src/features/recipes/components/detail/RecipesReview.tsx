import { usePostUserReview } from "@/api/useRecipes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { useAuthUserStore } from "@/features/auth/stores/authUserStore";
import { ReviewCard } from "@/utils/ReviewCard";
import { cn } from "cn";
import { LoaderCircle, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { Link, useRevalidator } from "react-router-dom";

export type Review = {
  id: number;
  rating: number;
  comment: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
    email: string | null;
  };
};

type RecipesReviewsProps = {
  recipeId: number;
  reviews: Review[];
};

export function RecipesReview({ recipeId, reviews }: RecipesReviewsProps) {
  const revalidator = useRevalidator();
  const user = useAuthUserStore((state) => state.user);
  const status = useAuthUserStore((state) => state.status);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Prevent another submission while fresh loader data is arriving.
  const [submittedReview, setSubmittedReview] = useState<{
    recipeId: number;
    userId: number;
  } | null>(null);

  const { mutate, isPending, isError } = usePostUserReview();

  const hasReviewed =
    !!user && reviews.some((review) => review.user.id === user.userId);

  const awaitingReviewRefresh =
    !!user &&
    submittedReview?.recipeId === recipeId &&
    submittedReview?.userId === user.userId &&
    !hasReviewed;

  const isValidReview =
    Number.isInteger(rating) &&
    rating >= 1 &&
    rating <= 5 &&
    comment.trim().length > 0 &&
    comment.trim().length <= 1000;

  const handleSubmitReview = () => {
    if (
      status === "loading" ||
      !user ||
      hasReviewed ||
      awaitingReviewRefresh ||
      isPending ||
      !isValidReview
    ) {
      return;
    }

    const submittingUserId = user.userId;

    mutate(
      { recipeId, rating, comment: comment.trim() },
      {
        onSuccess: () => {
          setSubmittedReview({
            recipeId,
            userId: submittingUserId,
          });
          setRating(0);
          setComment("");
          revalidator.revalidate();
        },
      },
    );
  };

  return (
    <section className="w-full rounded-lg bg-white p-4 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Reviews
        </h2>

        {status !== "loading" && !user && (
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
        <div className="my-6 h-24 animate-pulse rounded-xl bg-gray-100" />
      ) : user && hasReviewed ? (
        <p className="my-6 rounded-lg bg-orange-50 px-4 py-3 text-sm text-gray-600">
          You’ve already reviewed this recipe. Use the three-dot menu on your
          review to edit or delete it.
        </p>
      ) : user && awaitingReviewRefresh ? (
        <p
          role="status"
          className="my-6 rounded-lg bg-orange-50 px-4 py-3 text-sm text-gray-600"
        >
          Your review was submitted successfully.
        </p>
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
                src={user.image ?? undefined}
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

            <div className="flex flex-wrap items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  disabled={isPending}
                  aria-label={`Rate ${index + 1} out of 5 stars`}
                  aria-pressed={rating === index + 1}
                  className="flex size-10 items-center justify-center rounded-md hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
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

              <span className="ml-4 text-sm text-gray-600 md:ml-8">
                {rating} out of 5
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`recipe-review-${recipeId}`}
              className="block text-sm font-medium text-gray-700"
            >
              Your review
            </label>

            <textarea
              id={`recipe-review-${recipeId}`}
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              maxLength={1000}
              disabled={isPending}
              placeholder="How did it turn out? Any tips or changes?"
              className="block w-full resize-y rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmitReview}
              disabled={isPending || !isValidReview}
              className={cn(
                buttonVariants(),
                "bg-orange-500 text-white hover:bg-orange-600",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>

          {isError && (
            <p role="alert" className="text-sm text-red-500">
              Unable to submit your review. Please try again.
            </p>
          )}
        </div>
      ) : null}

      <section className="mt-8 border-t border-gray-100 pt-6">
        <div className="mt-5 flex flex-col">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                recipeId={recipeId}
                onDeleted={() => {
                  setSubmittedReview(null);
                  setRating(0);
                  setComment("");
                  revalidator.revalidate();
                }}
              />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-orange-200 bg-orange-50/30 px-6 py-8 text-center">
              <MessageSquare
                className="mx-auto mb-3 size-6 text-orange-500"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-gray-900">
                Be the first to review
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Tried this recipe? Share how it turned out and help others cook
                it.
              </p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
