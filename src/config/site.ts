const links = {
  x: "https://twitter.com/sample",
  github: "https://github.com/sample/foodrecipe",
  githubAccount: "https://github.com/sample",
  discord: "https://discord.com/users/sample",
};

export const siteConfig = {
  name: "Food Recipe",
  description:
    "Discover recipes from around the world and find your next favorite meal.",
  links,
  footerDescription: "Discover. Cook. Enjoy.",
  mainNav: [
    {
      title: "Recipes",
      menu: [
        {
          title: "Recipes",
          href: "/recipes",
        },
        {
          title: "Cuisines",
          href: "/cuisines",
        },
        {
          title: "About",
          href: "/about",
        },
      ],
    },
  ],
  footerNav: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Privacy",
      href: "/privacy",
    },
  ],
};