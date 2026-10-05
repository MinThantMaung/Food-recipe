import breakfastImage from "../assets/Home/breakfast.png";
import lunchImage from "../assets/Home/lunch.png";
import dinnerImage from "../assets/Home/dinner.png";
import desertImage from "../assets/Home/desert.png";
import japaneseCuisine from "../assets/Home/JapaneseCuisine.png";
import myanmarCuisine from "../assets/Home/MyanmarCuisine.png";
import thaiCuisine from "../assets/Home/ThaiCuisine.png";
import italianCuisine from "../assets/Home/ItalianCuisine.png";
import { Bubbles, ChefHat, Globe, Heart, icons, MessageCircle, ToolCase } from "lucide-react";

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
    icons: ToolCase,
    title: "Website issues",
    description: "Found a problem on the sites?Let us know what happened so we can look into it.",
  },
  {
    icons: Bubbles,
    title: "General questions",
    description: "Have a question or an idea to share?We are always happy to hear from fellow food lovers.",
  },
];
