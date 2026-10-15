import { useId, useState } from "react";
import { Pencil, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "cn";

type RecipesReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: {
    rating: number;
    comment: string | null;
  };
  onSave: (values: { rating: number; comment: string }) => void;
  isSaving?: boolean;
  error?: string;
};

const ratingLabels = [
  "",
  "Not for me",
  "Could be better",
  "Good",
  "Really good",
  "Absolutely delicious",
];

export function RecipesReviewDialog({
  open,
  onOpenChange,
  review,
  onSave,
  isSaving = false,
  error,
}: RecipesReviewDialogProps) {
  const commentId = useId();

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment ?? "");
  const [hoverRating, setHoverRating] = useState(0);

  const displayedRating = hoverRating || rating;
  const ratingChanged = rating !== review.rating;
  const hasChanges =
    ratingChanged || comment.trim() !== (review.comment ?? "").trim();

  const canSave =
    hasChanges &&
    rating >= 1 &&
    rating <= 5 &&
    comment.trim().length > 0 &&
    comment.trim().length <= 1000 &&
    !isSaving;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isSaving) onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-2xl p-0 sm:max-w-xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!canSave) return;

            onSave({
              rating,
              comment: comment.trim(),
            });
          }}
        >
          <div className="space-y-7 p-5 md:space-y-8 md:p-8">
            <DialogHeader className="text-left">
              <DialogTitle className="pr-8 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
                Edit your review
              </DialogTitle>

              <DialogDescription className="text-base text-gray-500">
                How was this recipe?
              </DialogDescription>
            </DialogHeader>

            <fieldset disabled={isSaving} className="min-w-0">
              <legend className="text-lg font-semibold text-gray-950">
                Your rating
              </legend>

              <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-gray-500">
                  Click a star to change your rating.
                </p>

                {ratingChanged && (
                  <span
                    role="status"
                    className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600"
                  >
                    <Pencil className="size-3.5" />
                    Changed from {review.rating} to {rating} stars
                  </span>
                )}
              </div>

              <div
                className="mt-5 grid grid-cols-5 gap-2 sm:gap-3"
                onMouseLeave={() => setHoverRating(0)}
              >
                {Array.from({ length: 5 }, (_, index) => {
                  const value = index + 1;
                  const isFilled = value <= displayedRating;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      aria-label={`Rate ${value} out of 5 stars`}
                      aria-pressed={rating === value}
                      className={cn(
                        "flex h-16 items-center justify-center rounded-xl border transition-colors sm:h-20",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        isFilled ? "bg-orange-50" : "bg-gray-50",
                        rating === value
                          ? "border-orange-500"
                          : "border-transparent",
                      )}
                    >
                      <Star
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                          "size-8 sm:size-10",
                          isFilled
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-400",
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-base font-semibold text-orange-600 md:text-lg">
                {displayedRating} / 5 — {ratingLabels[displayedRating]}
              </p>
            </fieldset>

            <div className="space-y-2">
              <label
                htmlFor={commentId}
                className="block text-lg font-semibold text-gray-950"
              >
                Your review
              </label>

              <textarea
                id={commentId}
                rows={4}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                maxLength={1000}
                disabled={isSaving}
                placeholder="Share your experience with this recipe..."
                className="block w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 md:text-base"
              />

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-4 md:px-8 md:py-5">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSaving}
                  className="h-11 rounded-lg px-6"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={!canSave}
              className="h-11 rounded-lg bg-orange-500 px-6 text-white hover:bg-orange-600"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}