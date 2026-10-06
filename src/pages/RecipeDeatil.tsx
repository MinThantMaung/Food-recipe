import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { recipeId } = useParams();

  return (
    <div>
      <h1>Recipe Detail</h1>
      <p>Recipe ID: {recipeId}</p>
    </div>
  );
}

export default RecipeDetail;