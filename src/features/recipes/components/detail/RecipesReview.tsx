
import { Button } from "@/components/ui/button";
import { reviews } from "@/utils/items";
import { ReviewCard } from "@/utils/ReviewCard";

export function RecipesReview() {
  return (
    <section className="w-full rounded-lg bg-white p-4 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Reviews
        </h2>

        <Button
          variant="outline"
          className="cursor-pointer border-orange-500 bg-white text-orange-600 hover:text-orange-500"
        >
          Sign in to review
        </Button>
      </div>

      <div className="my-4 flex flex-col md:my-8">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
