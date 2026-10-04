import breakfastImage from "../assets/breakfast.png"
import lunchImage from "../assets/lunch.png"
import dinnerImage from "../assets/dinner.png"
import desertImage from "../assets/desert.png"
import japaneseCuisine from "../assets/JapaneseCuisine.png"
import myanmarCuisine from "../assets/MyanmarCuisine.png"
import thaiCuisine from "../assets/ThaiCuisine.png"
import italianCuisine from "../assets/ItalianCuisine.png" 

export const meals = [
  { title: "Breakfast", image: breakfastImage, category: "breakfast" },
  { title: "Lunch", image: lunchImage, category: "lunch" },
  { title: "Dinner", image: dinnerImage, category: "dinner" },
  { title: "Desserts", image: desertImage, category: "desserts" },
];

export const cuisines = [
  { title: "Japanese", image: japaneseCuisine, cuisine: "japanese" },
  { title: "Myanmar", image: myanmarCuisine, cuisine: "myanmar" },
  { title: "Thai", image: thaiCuisine, cuisine: "thai" },
  { title: "Italian", image: italianCuisine, cuisine: "italian" },
];