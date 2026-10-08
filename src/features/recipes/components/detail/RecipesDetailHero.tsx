import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type RecipesDetailHeroProps = {
  recipe: {
    title: string;
    cuisine: string;
    rating: number;
    reviewCount?: number;
    image: string;
  };
};

export function RecipesDetailsHero({ recipe }: RecipesDetailHeroProps) {
  const safeRating = Math.max(0, Math.min(5, recipe.rating));
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Heading */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/">Home</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/recipes">Recipes</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-orange-500">
              {recipe.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        {recipe.title}
      </h1>
      {/* Description */}
      <p className="max-w-3xl text-sm leading-7 text-gray-500 sm:text-base">
        A comforting and flavorful Japanese curry with tender chicken, potatos
        and carrots in a rich, mildly spiced sauce. Perfect with steaming hot
        rice.
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <Badge
          variant="ghost"
          className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600"
        >
          {recipe.cuisine}
        </Badge>
        {/* Cuisine and rating */}
        <div
          className="flex items-center gap-2"
          aria-label={`Rated ${safeRating.toFixed(1)} out of 5 stars${
            recipe.reviewCount !== undefined
              ? ` from ${recipe.reviewCount} reviews`
              : ""
          }`}
        >
          <div aria-hidden="true" className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="relative block size-4">
                <Star size={16} className="fill-gray-200 stroke-gray-200" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: `${
                      Math.max(0, Math.min(1, safeRating - index)) * 100
                    }%`,
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
            <span className="font-semibold text-gray-900">
              {safeRating.toFixed(1)}
            </span>
            {recipe.reviewCount !== undefined &&
              ` (${recipe.reviewCount} reviews)`}
          </span>
        </div>
      </div>
      <div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="aspect-4/3 w-full rounded-2xl object-cover object-center md:aspect-16/7"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
