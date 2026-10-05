import { useSearchParams } from "react-router-dom";

function Recipes() {
  const [searchParams] = useSearchParams();

  const meal = searchParams.get("meal");
  const cuisine = searchParams.get("cuisine");

  console.log("data : ",{ meal, cuisine });
  return (
    <div>
      hello
      <div>This is recipes</div>
    </div>
  );
};


export default Recipes;