
import type { LucideIcon } from "lucide-react";

type AboutCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const AboutCard = ({
  icon: Icon,
  title,
  description,
}: AboutCardProps) => {
  return (
    <div
      className="flex flex-col items-start gap-5
        rounded-2xl border border-gray-100
        bg-white p-6 shadow-sm
        transition-shadow duration-300
        hover:shadow-md sm:p-8"
    >
      <Icon
        aria-hidden="true"
        className="size-10 text-orange-500"
        strokeWidth={1.8}
      />

      <div className="space-y-3">
        <h3 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
          {title}
        </h3>

        <p className="text-sm leading-7 text-gray-500 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};
