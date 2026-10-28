import { ChefHat, Globe, Heart, Lightbulb, MessageCircle, Wrench } from "lucide-react";
import type { FoodCardProps } from "./FoodCard";

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

export const dummyRecipes: FoodCardProps[] = [
  {
    recipeId: 1,
    title: "Burmese Chicken Curry",
    image: "",
    to: "/recipes/1",
    prepTime: 15,
    cookingTime: 40,
    country: { cuisineName: "Burmese" },
    rating: 4.8,
    reviewCount: 24,
  },
  {
    recipeId: 2,
    title: "Mohinga",
    image: "",
    to: "/recipes/2",
    prepTime: 20,
    cookingTime: 40,
    country: { cuisineName: "Burmese" },
    rating: 4.9,
    reviewCount: 38,
  },
  {
    recipeId: 3,
    title: "Thai Basil Chicken",
    image: "",
    to: "/recipes/3",
    prepTime: 10,
    cookingTime: 15,
    country: { cuisineName: "Thai" },
    rating: 4.7,
    reviewCount: 32,
  },
  {
    recipeId: 4,
    title: "Thai Green Curry",
    image: "",
    to: "/recipes/4",
    prepTime: 15,
    cookingTime: 25,
    country: { cuisineName: "Thai" },
    rating: 4.6,
    reviewCount: 19,
  },
  {
    recipeId: 5,
    title: "Chicken Teriyaki",
    image: "",
    to: "/recipes/5",
    prepTime: 10,
    cookingTime: 20,
    country: { cuisineName: "Japanese" },
    rating: 4.8,
    reviewCount: 45,
  },
  {
    recipeId: 6,
    title: "Chicken Katsu Curry",
    image: "",
    to: "/recipes/6",
    prepTime: 20,
    cookingTime: 30,
    country: { cuisineName: "Japanese" },
    rating: 4.9,
    reviewCount: 51,
  },
  {
    recipeId: 7,
    title: "Kimchi Fried Rice",
    image: "",
    to: "/recipes/7",
    prepTime: 5,
    cookingTime: 15,
    country: { cuisineName: "Korean" },
    rating: 4.5,
    reviewCount: 28,
  },
  {
    recipeId: 8,
    title: "Beef Bulgogi",
    image: "",
    to: "/recipes/8",
    prepTime: 20,
    cookingTime: 15,
    country: { cuisineName: "Korean" },
    rating: 4.8,
    reviewCount: 36,
  },
  {
    recipeId: 9,
    title: "Bibimbap",
    image: "",
    to: "/recipes/9",
    prepTime: 20,
    cookingTime: 20,
    country: { cuisineName: "Korean" },
    rating: 4.7,
    reviewCount: 23,
  },
];