
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CuisineCard } from "@/utils/CuisineCard";
import { cuisinesPageItem } from "@/utils/items";
import { Search } from "lucide-react";
import { useState } from "react";

const continents = [
  "All",
  "Asia",
  "Europe",
  "Africa",
  "Americas",
  "Oceania",
];

function Cuisine() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] =
    useState("All");

  // Handle continent selection
  const handleContinentChange = (continent: string) => {
    setSelectedContinent(continent);
  };

  // Filter cuisines based on search and continent
  const filteredCuisines = cuisinesPageItem.filter((cuisine) => {
    const matchesSearch = cuisine.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesContinent =
      selectedContinent === "All" ||
      cuisine.continent === selectedContinent;

    return matchesSearch && matchesContinent;
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
          Explore flavors around the world
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Discover diverse cuisines, rich traditions and
          unforgettable dishes from every corner of the globe.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mx-auto mb-8 w-full max-w-xl">
        {/* Search input */}
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-gray-400"
          />

          <Input
            type="search"
            aria-label="Search cuisines"
            placeholder="Search cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-full border
              border-gray-200 bg-white pr-5 pl-12
              text-sm shadow-sm
              placeholder:text-gray-400
              focus-visible:border-orange-400
              focus-visible:ring-2
              focus-visible:ring-orange-500/20
              sm:h-14 sm:text-base"
          />
        </div>

        {/* Continent filters */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {continents.map((item) => (
            <Button
              key={item}
              type="button"
              variant="outline"
              aria-pressed={selectedContinent === item}
              onClick={() => handleContinentChange(item)}
              className={`rounded-full px-4 transition-colors cursor-pointer ${
                selectedContinent === item
                  ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* Cuisine Cards */}
      {filteredCuisines.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCuisines.map((cuisine) => (
            <CuisineCard
              key={cuisine.cuisine}
              title={cuisine.title}
              description={cuisine.description}
              image={cuisine.image}
              to={`/recipes?cuisine=${encodeURIComponent(
                cuisine.cuisine
              )}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Search
            size={32}
            className="mx-auto mb-4 text-gray-400"
          />

          <h3 className="text-lg font-semibold text-gray-950">
            No cuisines found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try another search or select a different continent.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5 rounded-full"
            onClick={() => {
              setSearchQuery("");
              setSelectedContinent("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </main>
  );
}

export default Cuisine;
