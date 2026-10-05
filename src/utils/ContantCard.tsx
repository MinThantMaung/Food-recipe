import type { LucideIcon } from "lucide-react";

type ContactCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const ContactCard = ({
  icon: Icon,
  title,
  description,
}: ContactCardProps) => {
  return (
    <div className="flex items-start gap-4 rounded-xl p-5">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg">
        <Icon
          aria-hidden="true"
          className="size-6 text-orange-500"
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0 space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {title}
        </h3>

        <p className="text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};