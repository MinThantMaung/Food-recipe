import { CuisineCategories } from "@/components/home/CuisineCategories";
import { Hero } from "@/components/home/Hero";
import { MealCategories } from "@/components/home/MealCategories";

function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <MealCategories />
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
