import { aboutItems } from "@/utils/items";
import aboutImage from "../assets/About/about.png";
import { AboutCard } from "@/utils/AboutCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import aboutBanner from "../assets/About/aboutBanner.png"

export default function About() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid grid-cols-1 items-center gap-12 py-8 md:grid-cols-2 lg:gap-16 lg:py-12">
        <div className="space-y-6">
          <h1 className="max-w-lg text-4xl leading-tight font-extrabold tracking-tight text-gray-950 sm:text-5xl">
            Good Food
            <br />
            <span className="text-orange-500">brings us together.</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-gray-500 lg:text-lg">
            Food Recipe makes it easier to discover dishes from around the world
            and cook them at home.
          </p>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-3xl bg-orange-50 sm:-inset-3"
          />

          <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-orange-950/10">
            <img
              src={aboutImage}
              alt="Home cook chopping fresh herbs and preparing ingredients"
              className="aspect-4/3 w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-food-recipe"
        className="mx-auto max-w-6xl py-12 text-start lg:py-16"
      >
        <h2
          id="why-food-recipe"
          className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl"
        >
          Why Food Recipe?
        </h2>

        <p className="mt-5 text-base leading-8 text-gray-500">
          Food brings people, cultures, and everyday moments together. Food
          Recipe helps you explore cuisines from around the world with clear
          ingredients and step-by-step instructions, making it easier to try
          something new and cook great food at home.
        </p>
      </section>
      <section className="mb-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {aboutItems.map((item) => (
            <AboutCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
      <section className="relative isolate overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={aboutBanner}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-orange-50 via-orange-50/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-87.5 items-center px-6 py-12 sm:px-10 md:min-h-100px lg:px-12">
        <div className="max-w-md space-y-6">
          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            A project built
            <br />
            with curiosity.
          </h2>

          <p className="max-w-sm text-base leading-relaxed text-gray-400 sm:text-lg">
            An independent project inspired by a love of
            food and learning.
          </p>

          <Link
            to="/recipes"
            className="inline-flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Browse recipes
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
    </main>
  );
}
