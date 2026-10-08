import breakfastImage from "../assets/Home/breakfast.png";
import lunchImage from "../assets/Home/lunch.png";
import dinnerImage from "../assets/Home/dinner.png";
import desertImage from "../assets/Home/desert.png";
import japaneseCuisine from "../assets/Home/JapaneseCuisine.png";
import myanmarCuisine from "../assets/Home/MyanmarCuisine.png";
import thaiCuisine from "../assets/Home/ThaiCuisine.png";
import italianCuisine from "../assets/Home/ItalianCuisine.png";
import { ChefHat, Globe, Heart, Lightbulb, MessageCircle, Wrench } from "lucide-react";
import type { Ingredient } from "../features/recipes/components/detail/RecipeIngredients";
import type { Instruction } from "../features/recipes/components/detail/RecipesInstructions";
import type { Review } from "./ReviewCard";

export const meals = [
  { title: "Breakfast", image: breakfastImage, category: "breakfast" },
  { title: "Lunch", image: lunchImage, category: "lunch" },
  { title: "Dinner", image: dinnerImage, category: "dinner" },
  { title: "Desserts", image: desertImage, category: "dessert" },
];

export const cuisines = [
  { title: "Japanese", image: japaneseCuisine, cuisine: "japanese" },
  { title: "Myanmar", image: myanmarCuisine, cuisine: "myanmar" },
  { title: "Thai", image: thaiCuisine, cuisine: "thai" },
  { title: "Italian", image: italianCuisine, cuisine: "italian" },
];

export const cuisinesPageItem = [
  {
    title: "Japanese",
    image: japaneseCuisine,
    cuisine: "japanese",
    continent: "Asia",
    description:
      "Delicate flavors, fresh ingredients and a harmony of tradition and simplicity.",
  },
  {
    title: "Myanmar",
    image: myanmarCuisine,
    cuisine: "myanmar",
    continent: "Asia",
    description:
      "Hearty and fragrant fish noodle soup at the heart of a rich culinary heritage.",
  },
  {
    title: "Thai",
    image: thaiCuisine,
    cuisine: "thai",
    continent: "Asia",
    description:
      "Bold flavors, fresh herbs and a perfect balance of sweet, sour, salty and spicy.",
  },
  {
    title: "Italian",
    image: italianCuisine,
    cuisine: "italian",
    continent: "Europe",
    description:
      "Classic dishes, high-quality ingredients and a celebration of simple, delicious food.",
  },
  {
    title: "Indian",
    image: myanmarCuisine,
    cuisine: "indian",
    continent: "Asia",
    description:
      "A vibrant palette of spices, aromatic dishes and centuries of culinary tradition.",
  },
  {
    title: "Mexican",
    image: thaiCuisine,
    cuisine: "mexican",
    continent: "Americas",
    description:
      "Bold and vibrant flavors, from street food favorites to timeless traditional dishes.",
  },
  {
    title: "Korean",
    image: japaneseCuisine,
    cuisine: "korean",
    continent: "Asia",
    description:
      "Colorful, wholesome dishes with bold flavors and a unique culinary heritage.",
  },
  {
    title: "French",
    image: italianCuisine,
    cuisine: "french",
    continent: "Europe",
    description:
      "Refined flavors, seasonal ingredients and a rich culinary tradition.",
  },
  {
    title: "Vietnamese",
    image: myanmarCuisine,
    cuisine: "vietnamese",
    continent: "Asia",
    description:
      "Light, aromatic and fresh dishes with a beautiful balance of flavors.",
  },
];

//temp data
export const recipes = [
  {
    id: 1,
    title: "Garlic Butter Pasta",
    image: breakfastImage,
    to: "/recipes/garlic-butter-pasta",
    cuisine: "Italian",
    duration: "20 min",
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: 2,
    title: "Chicken Stir-Fry",
    image: desertImage,
    to: "/recipes/chicken-stir-fry",
    cuisine: "Thai",
    duration: "25 min",
    rating: 4.7,
    reviewCount: 184,
  },
  {
    id: 3,
    title: "Vegetable Fried Rice",
    image: lunchImage,
    to: "/recipes/vegetable-fried-rice",
    cuisine: "Chinese",
    duration: "20 min",
    rating: 4.6,
    reviewCount: 271,
  },
  {
    id: 4,
    title: "Avocado Toast",
    image: dinnerImage,
    to: "/recipes/avocado-toast",
    cuisine: "American",
    duration: "10 min",
    rating: 4.5,
    reviewCount: 198,
  },
];

export const aboutItems = [
  {
    icon: Globe,
    title: "Discover new flavors",
    description:
      "Explore recipes from different cuisines and find inspiration for your next meal.",
  },
  {
    icon: ChefHat,
    title: "Cook with confidence",
    description:
      "Follow simple, step-by-step instructions to make delicious meals at home.",
  },
  {
    icon: Heart,
    title: "Share the love",
    description:
      "Discover favorites, leave reviews, and celebrate great food together.",
  },
];

export const privacySections = [
  {
    id: "overview",
    title: "Overview",
    content: `
      <p>
        Welcome to <strong>Food Recipe</strong>, a platform for
        discovering recipes, exploring cuisines, and finding cooking
        inspiration from around the world.
      </p>

      <p>
        We value your privacy. This Privacy Policy explains how
        we collect, use, and handle personal information when
        you visit our website, create an account, or interact
        with our features.
      </p>
    `,
  },
  {
    id: "information",
    title: "Information we collect",
    content: `
      <p>
        We may collect certain information when you use Food Recipe.
        This includes information you provide directly and
        information generated through your interactions with
        our services.
      </p>

      <p>The information we collect may include:</p>

      <ul>
        <li>
          <strong>Account information:</strong>
          Your email address, name, and other profile details
          you choose to provide.
        </li>
        <li>
          <strong>User content:</strong>
          Recipe ratings, reviews, comments, and other
          information you submit.
        </li>
        <li>
          <strong>Technical information:</strong>
          Information needed to maintain, operate, and
          protect the website.
        </li>
      </ul>
    `,
  },
  {
    id: "usage",
    title: "How we use information",
    content: `
      <p>
        We use the information we collect to provide a reliable
        and enjoyable experience on Food Recipe.
      </p>

      <p>This may include:</p>

      <ul>
        <li>Creating and managing user accounts.</li>
        <li>Providing recipe-related features and services.</li>
        <li>Displaying reviews and other submitted content.</li>
        <li>Responding to questions and requests.</li>
        <li>Maintaining website security and performance.</li>
        <li>Understanding how our services are used and improving the user experience.</li>
      </ul>
    `,
  },
  {
    id: "cookies",
    title: "Cookies and sign-in",
    content: `
      <p>
        Food Recipe may use cookies and similar technologies
        to support essential website functionality,
        authentication, and account security.
      </p>

      <p>
        When you sign in, authentication cookies may be stored
        on your device to help maintain your session.
        If you use a third-party sign-in provider, such as
        Google or Facebook, that provider may process
        information according to its own privacy policy.
      </p>

      <p>
        You can manage or restrict cookies through your
        browser settings. However, disabling essential
        cookies may affect certain features, including
        the ability to remain signed in.
      </p>
    `,
  },
  {
    id: "choices",
    title: "Your choices",
    content: `
      <p>
        We want you to have control over the information
        you share with Food Recipe.
      </p>

      <p>Depending on the features available, you may:</p>

      <ul>
        <li>Review or update your profile information.</li>
        <li>Manage your browser's cookie preferences.</li>
        <li>Contact us about your personal information.</li>
      </ul>

      <p>
        If you have questions or would like to make a
        privacy-related request, please contact us
        using the information below.
      </p>
    `,
  },
  {
    id: "contact",
    title: "Contact",
    content: `
      <p>
        If you have any questions about this Privacy Policy
        or how Food Recipe handles personal information,
        please feel free to reach out.
      </p>

      <p>
        You can get in touch with us through our
        <a href="/contact">Contact page</a>.
      </p>
    `,
  },
];

export const ContantSections = [
  {
    icons: MessageCircle,
    title: "Recipe Feedback",
    description: "Tell us what you loved,what could be clearer, or share your own tips. Your feedback helps make our recipes better for everyone.",
  },
  {
    icons: Wrench,
    title: "Website issues",
    description: "Found a problem on the sites?Let us know what happened so we can look into it.",
  },
  {
    icons: Lightbulb,
    title: "General questions",
    description: "Have a question or an idea to share?We are always happy to hear from fellow food lovers.",
  },
];

export const recipeFilters = [
  {
    id: "meal",
    title: "Meal",
    options: [
      { label: "Breakfast", value: "breakfast" },
      { label: "Lunch", value: "lunch" },
      { label: "Dinner", value: "dinner" },
      { label: "Snacks", value: "snacks" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    id: "totalTime",
    title: "Total time",
    options: [
      { label: "Under 15 minutes", value: "under-15" },
      { label: "Under 30 minutes", value: "under-30" },
      { label: "30–60 minutes", value: "30-60" },
      { label: "Over 60 minutes", value: "over-60" },
    ],
  },
  {
    id: "cuisine",
    title: "Cuisine",
    options: [
      { label: "Italian", value: "italian" },
      { label: "Asian", value: "asian" },
      { label: "Indian", value: "indian" },
      { label: "Mexican", value: "mexican" },
      { label: "American", value: "american" },
      { label: "Mediterranean", value: "mediterranean" },
      { label: "Thai", value: "thai" },
      { label: "Chinese", value: "chinese" },
      { label: "Japanese", value: "japanese" },
      { label: "French", value: "french" },
    ],
  },
  {
    id: "diet",
    title: "Diet",
    options: [
      { label: "Vegetarian", value: "vegetarian" },
      { label: "Vegan", value: "vegan" },
      { label: "Gluten Free", value: "gluten-free" },
      { label: "Dairy Free", value: "dairy-free" },
      { label: "Low Carb", value: "low-carb" },
      { label: "High Protein", value: "high-protein" },
    ],
  },
] as const;



// Temporary mock data

export const recipesItems = [
  {
    id: 1,
    title: "Garlic Butter Pasta",
    image: breakfastImage,
    to: "/recipes/garlic-butter-pasta",
    cuisine: "Italian",
    meal: ["lunch", "dinner"],
    duration: 20,
    diets: ["vegetarian"],
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: 2,
    title: "Chicken Stir-Fry",
    image: desertImage,
    to: "/recipes/chicken-stir-fry",
    cuisine: "Thai",
    meal: ["lunch", "dinner"],
    duration: 25,
    diets: ["high-protein"],
    rating: 4.7,
    reviewCount: 184,
  },
  {
    id: 3,
    title: "Vegetable Fried Rice",
    image: lunchImage,
    to: "/recipes/vegetable-fried-rice",
    cuisine: "Chinese",
    meal: ["lunch", "dinner"],
    duration: 20,
    diets: ["vegetarian", "dairy-free"],
    rating: 4.6,
    reviewCount: 271,
  },
  {
    id: 4,
    title: "Avocado Toast",
    image: dinnerImage,
    to: "/recipes/avocado-toast",
    cuisine: "American",
    meal: ["breakfast", "snacks"],
    duration: 10,
    diets: ["vegan", "vegetarian", "dairy-free"],
    rating: 4.5,
    reviewCount: 198,
  },
  {
    id: 5,
    title: "Chicken Biryani",
    image: lunchImage,
    to: "/recipes/chicken-biryani",
    cuisine: "Indian",
    meal: ["lunch", "dinner"],
    duration: 60,
    diets: ["high-protein"],
    rating: 4.9,
    reviewCount: 421,
  },
  {
    id: 6,
    title: "Japanese Ramen",
    image: dinnerImage,
    to: "/recipes/japanese-ramen",
    cuisine: "Japanese",
    meal: ["lunch", "dinner"],
    duration: 45,
    diets: [],
    rating: 4.8,
    reviewCount: 356,
  },
  {
    id: 7,
    title: "Pad Thai",
    image: breakfastImage,
    to: "/recipes/pad-thai",
    cuisine: "Thai",
    meal: ["lunch", "dinner"],
    duration: 30,
    diets: [],
    rating: 4.7,
    reviewCount: 245,
  },
  {
    id: 8,
    title: "Beef Tacos",
    image: desertImage,
    to: "/recipes/beef-tacos",
    cuisine: "Mexican",
    meal: ["lunch", "dinner"],
    duration: 25,
    diets: ["high-protein"],
    rating: 4.6,
    reviewCount: 189,
  },
  {
    id: 9,
    title: "Margherita Pizza",
    image: dinnerImage,
    to: "/recipes/margherita-pizza",
    cuisine: "Italian",
    meal: ["lunch", "dinner"],
    duration: 40,
    diets: ["vegetarian"],
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: 10,
    title: "Greek Salad",
    image: lunchImage,
    to: "/recipes/greek-salad",
    cuisine: "Mediterranean",
    meal: ["lunch", "dinner"],
    duration: 15,
    diets: ["vegetarian", "gluten-free", "low-carb"],
    rating: 4.5,
    reviewCount: 142,
  },
  {
    id: 11,
    title: "French Toast",
    image: breakfastImage,
    to: "/recipes/french-toast",
    cuisine: "French",
    meal: ["breakfast"],
    duration: 15,
    diets: ["vegetarian"],
    rating: 4.6,
    reviewCount: 223,
  },
  {
    id: 12,
    title: "Butter Chicken",
    image: dinnerImage,
    to: "/recipes/butter-chicken",
    cuisine: "Indian",
    meal: ["lunch", "dinner"],
    duration: 50,
    diets: ["high-protein"],
    rating: 4.9,
    reviewCount: 487,
  },
  {
    id: 13,
    title: "Shrimp Fried Rice",
    image: lunchImage,
    to: "/recipes/shrimp-fried-rice",
    cuisine: "Chinese",
    meal: ["lunch", "dinner"],
    duration: 25,
    diets: ["high-protein", "dairy-free"],
    rating: 4.7,
    reviewCount: 298,
  },
  {
    id: 14,
    title: "Chicken Caesar Salad",
    image: desertImage,
    to: "/recipes/chicken-caesar-salad",
    cuisine: "American",
    meal: ["lunch", "dinner"],
    duration: 20,
    diets: ["high-protein"],
    rating: 4.5,
    reviewCount: 175,
  },
  {
    id: 15,
    title: "Spaghetti Carbonara",
    image: breakfastImage,
    to: "/recipes/spaghetti-carbonara",
    cuisine: "Italian",
    meal: ["lunch", "dinner"],
    duration: 30,
    diets: [],
    rating: 4.8,
    reviewCount: 364,
  },
  {
    id: 16,
    title: "Japanese Sushi Rolls",
    image: lunchImage,
    to: "/recipes/japanese-sushi-rolls",
    cuisine: "Japanese",
    meal: ["lunch", "dinner"],
    duration: 45,
    diets: ["dairy-free"],
    rating: 4.7,
    reviewCount: 267,
  },
  {
    id: 17,
    title: "Thai Green Curry",
    image: dinnerImage,
    to: "/recipes/thai-green-curry",
    cuisine: "Thai",
    meal: ["lunch", "dinner"],
    duration: 35,
    diets: [],
    rating: 4.8,
    reviewCount: 338,
  },
  {
    id: 18,
    title: "Beef Burger",
    image: desertImage,
    to: "/recipes/beef-burger",
    cuisine: "American",
    meal: ["lunch", "dinner"],
    duration: 30,
    diets: ["high-protein"],
    rating: 4.6,
    reviewCount: 415,
  },
  {
    id: 19,
    title: "Vegetable Curry",
    image: lunchImage,
    to: "/recipes/vegetable-curry",
    cuisine: "Indian",
    meal: ["lunch", "dinner"],
    duration: 40,
    diets: ["vegan", "vegetarian", "dairy-free"],
    rating: 4.5,
    reviewCount: 192,
  },
  {
    id: 20,
    title: "Chocolate Pancakes",
    image: breakfastImage,
    to: "/recipes/chocolate-pancakes",
    cuisine: "American",
    meal: ["breakfast", "dessert"],
    duration: 20,
    diets: ["vegetarian"],
    rating: 4.9,
    reviewCount: 276,
  },
];

export const ingredients: Ingredient[] = [
  {
    id: 1,
    name: "Chicken (boneless, skinless)",
    quantity: 250,
    unit: "g",
  },
  { id: 2, name: "Potatoes", quantity: 1 },
  { id: 3, name: "Carrots", quantity: 1 },
  { id: 4, name: "Onion", quantity: 0.5 },
  { id: 5, name: "Curry roux (Japanese)", quantity: 50, unit: "g" },
  { id: 6, name: "Water", quantity: 350, unit: "ml" },
  { id: 7, name: "Cooked rice", note: "to serve" },
  { id: 8, name: "Salt", note: "to taste" },
];

export const instructions: Instruction[] = [
  {
    id: 1,
    step: 1,
    title: "Prepare the chicken",
    description: "Peel and chop the potatoes and carrots into bite-sized pieces. Slice the onion, and Cut the chicken into pieces.",
  },
  {
    id: 2,
    step: 2,
    title: "Saute chicken and vegetables",
    description: "Heat a little oil in a large pot over medium heat. Add the chicken and cook until lightly browned. Add the onion, potatoes, and carrots, and saute for a few minutes until onion becomes soft.",
  },
  {
    id: 3,
    step: 3,
    title: "Simmer",
    description: "Add water to the pot and bring to a boil. Reduce the heat, cover, and simmer until the vegetables are tender.",
  },
  {
    id: 4,
    step: 4,
    title: "Add curry roux",
    description: "Turn off the heat and add the curry roux. Stir until dissolved,then return to low heat and simmer,strir occasionally until the sauce thickens.",
  },
  {
    id: 5,
    step: 5,
    title: "Serve",
    description: "Spoon the curry over cooked rice and serve hot. Adjust salt to taste.",
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    image: desertImage,
    name: "Samanta Lee",
    rating: 5,
    description: "The recipe was easy to follow and turned out delicious!The curry sauce is rich and comforting.My family love it.",
    commentDate: "May 12, 2024"

  },
   {
    id: 2,
    image: desertImage,
    name: "Daniel Kim",
    rating: 4.5,
    description: "The recipe was easy to follow and turned out delicious!The curry sauce is rich and comforting.My family love it.",
    commentDate: "May 12, 2024"

  },
];