import { CuisineCategories } from "@/features/auth/home/CuisineCategories";
import { FoodRecommendation } from "@/features/auth/home/FoodRecommendation";
import { Hero } from "@/features/auth/home/Hero";
import { MealCategories } from "@/features/auth/home/MealCategories";

function Home() {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <Hero />
      <MealCategories />
      <FoodRecommendation />
      <CuisineCategories />
      {/* <Form action="/logout" method="post">
        <Button type="submit" variant="outline">
          Logout
        </Button>
      </Form> */}
    </div>
  );
}

export default Home;
