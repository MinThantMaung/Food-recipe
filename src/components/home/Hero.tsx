import heroImage from "@/assets/Home/hero.png";
import { Search } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchRecipes = (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;
    // Implement your search logic here
    console.log(`Searching for recipes with query: ${query}`);
  };
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 py-8 md:grid-cols-2 md:gap-10 lg:py-10">
      <div className="flex flex-col items-start gap-6">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
          A world of flavor
        </span>

        <h1 className="max-w-lg text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-950 lg:text-5xl">
          What are you
          <br />
          <span className="text-orange-500">cooking today?</span>
        </h1>

        <p className="max-w-md text-base leading-7 text-gray-500 lg:text-lg lg:leading-8">
          Discover recipes from around the world, one delicious meal at a time.
        </p>

        <ButtonGroup className="mt-2 w-full max-w-lg rounded-xl shadow-sm">
          <div className="relative min-w-0 flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400"
            />

            <Input
              type="search"
              aria-label="Search recipes"
              placeholder="Search recipes..."
              className="h-12 rounded-l-xl rounded-r-none border-gray-200 bg-white pl-12 pr-3 text-base placeholder:text-gray-400 focus-visible:z-10 focus-visible:border-orange-400 focus-visible:ring-orange-500/20 sm:h-14"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  searchRecipes(searchQuery);
                }
              }}
            />
          </div>

          <Button
            type="button"
            className="h-12 shrink-0 cursor-pointer rounded-l-none rounded-r-xl bg-orange-500 px-5 font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:ring-orange-500/30 sm:h-14 sm:px-7"
            onClick={() => searchRecipes(searchQuery)}
          >
            Search
          </Button>
        </ButtonGroup>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span className="mr-1">Popular searches:</span>

          {["Chicken", "Pasta", "Salad"].map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="rounded-full border-orange-200 px-3 py-1 font-medium text-orange-600"
              onClick={() => searchRecipes(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative min-w-0">
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-[2rem] bg-orange-50 sm:-inset-4"
        />

        <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-orange-950/10">
          <img
            src={heroImage}
            alt="Grilled chicken bowl with avocado, vegetables and grains"
            className="aspect-4/3 max-h-105 w-full object-cover object-center"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};
