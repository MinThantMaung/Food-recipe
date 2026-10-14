type ProfileBannerProps = {
  title: string;
  imageUrl: string;
  description: string;
};

export function ProfileBanner({
  title,
  imageUrl,
  description,
}: ProfileBannerProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-xl">
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-amber-950/85 via-amber-950/60 to-transparent" />

      <div className="flex min-h-44 flex-col justify-center px-6 py-8 md:min-h-48 md:px-10">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90 md:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
