import { useDeleteReview, useUpdateReview } from "@/api/useRecipes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { useAuthUserStore } from "@/features/auth/stores/authUserStore";
import { RecipesReviewDialog } from "@/features/recipes/components/detail/RecipeReviewDialog";
import type { Review } from "@/features/recipes/components/detail/RecipesReview";
import { MoreVertical, Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";

type ReviewCardProps = {
  review: Review;
  recipeId: number;
  onDeleted: () => void;
};

export const ReviewCard = ({
  review,
  recipeId,
  onDeleted,
}: ReviewCardProps) => {
  const user = useAuthUserStore((state) => state.user);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fullname =
    [review.user.firstName, review.user.lastName].filter(Boolean).join(" ") ||
    review.user.email;

  const isOwner = !!user && user.userId === review.user.id;
  const revalidator = useRevalidator();

  const {
    mutate: deleteReviewMutation,
    isPending: isDeleting,
    isError: deleteError,
  } = useDeleteReview();

  const { mutate: updateReviewMutation } = useUpdateReview();

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    if (!isOwner || isDeleting) return;

    deleteReviewMutation(recipeId, {
      onSuccess: () => {
        onDeleted();
        toast.add({
          title: "Review deleted",
          description: "Your review has been deleted successfully.",
          type: "success",
        });
      },
    });
  };

  return (
    <article className="flex items-start gap-3 border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0 md:gap-4">
      <Avatar className="size-10 shrink-0 md:size-14">
        <AvatarImage
          src={review.user.image ?? undefined}
          alt={fullname}
          className="object-cover"
        />
        <AvatarFallback className="bg-orange-100 font-semibold text-orange-600">
          {fullname.trim().charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {/* Name, date, and owner actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="wrap-break-word font-bold text-gray-950">
                {fullname}
              </span>

              {isOwner && (
                <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600">
                  You
                </span>
              )}
            </div>

            <time
              dateTime={review.updatedAt}
              className="mt-1 block text-xs text-gray-500 md:text-sm"
            >
              {new Date(review.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-gray-500"
                    aria-label="Review options"
                  />
                }
              >
                <MoreVertical className="size-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="cursor-pointer gap-2"
                >
                  <Pencil className="size-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="cursor-pointer gap-2 text-red-600 data-highlighted:bg-red-50 data-highlighted:text-red-600"
                >
                  <Trash2 className="size-4 text-red-600" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Rating */}
        <div
          className="mt-2 flex items-center gap-1"
          role="img"
          aria-label={`Rated ${review.rating} out of 5`}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const fill = Math.max(0, Math.min(1, review.rating - index));

            return (
              <span key={index} className="relative size-4" aria-hidden="true">
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

          <span
            className="ml-2 text-sm font-semibold text-gray-700"
            aria-hidden="true"
          >
            {review.rating.toFixed(1)}
          </span>
        </div>

        {/* Comment */}
        {review.comment && (
          <p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-gray-600 md:text-base">
            {review.comment}
          </p>
        )}
        {deleteError && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            Unable to delete your review. Please try again.
          </p>
        )}
      </div>
      {isEditOpen && (
        <RecipesReviewDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          review={review}
          onSave={(values) => {
            updateReviewMutation(
              { recipeId, ...values },
              {
                onSuccess: () => {
                  setIsEditOpen(false);
                  revalidator.revalidate();
                },
              },
            );
          }}
        />
      )}
    </article>
  );
};
