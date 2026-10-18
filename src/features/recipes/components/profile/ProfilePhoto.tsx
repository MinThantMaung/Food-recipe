import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfilePhotoProps = {
  userDetail: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    image?: string | null;
    country?: { name: string } | null;
  };
  onPhotoChange: (file: File) => void;
};

export function ProfilePhoto({ userDetail,onPhotoChange }: ProfilePhotoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handlePhotoChange = (file?: File) => {
  if (!file) return;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    setError("Please select a JPG, PNG, or WebP image.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("Please select an image no larger than 5 MB.");
    return;
  }

  setError("");
  onPhotoChange(file); // Store the actual file in Profile.
  setPreviewUrl(URL.createObjectURL(file)); // Show the local preview.
};

  const initial = userDetail?.firstName?.trim().charAt(0).toUpperCase() || "M";
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 md:p-8">
      <h2 className="text-xl font-bold tracking-tight">Profile photo</h2>
      <p className="mt-1 text-sm text-gray-500">
        This will be shown on your profile and reviews.
      </p>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4 md:gap-6">
          <div className="relative w-fit shrink-0">
            <Avatar className="size-24 md:size-32">
              <AvatarImage
                src={previewUrl ?? userDetail.image ?? undefined}
                alt={userDetail.firstName || "Your profile"}
                className="object-cover"
              />
              <AvatarFallback className="bg-orange-100 text-4xl font-medium text-orange-500 md:text-5xl">
                {initial}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 flex size-10 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 md:size-11"
            >
              <Camera className="size-4 md:size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="min-w-0 space-y-1">
            <p className="wrap-break-word text-lg font-semibold text-gray-900 md:text-xl">
              {[userDetail.firstName, userDetail.lastName]
                .filter(Boolean)
                .join(" ") || userDetail.email}
            </p>
            <p className="text-sm text-gray-500">
              {userDetail.country?.name || "Country not set"}
            </p>
          </div>
        </div>
        <div className="space-y-2 sm:text-right">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2 border-orange-300 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
          >
            <Camera className="size-4" aria-hidden="true" />
            Change photo
          </Button>
          <p className="text-xs text-gray-500">JPG, PNG or WebP. Max 5 MB.</p>
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          handlePhotoChange(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </section>
  );
}
