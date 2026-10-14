import { useLoaderData } from "react-router-dom";
import type { profileLoader } from "@/router/loader";
import banner from "../assets/profileBanner.png";

import { ProfileBanner } from "@/features/recipes/components/ProfileBanner";
import { ProfilePhoto } from "@/features/recipes/components/profile/ProfilePhoto";
import { PersonalInformation } from "@/features/recipes/components/profile/PersonalInformation";
import { AccountInformation } from "@/features/recipes/components/profile/AccountInformation";

export default function Profile() {
  const { user: userDetail, continent: continentsData } =
    useLoaderData() as Awaited<ReturnType<typeof profileLoader>>;

  return (
    <div className="mx-auto h-full min-h-0 w-full max-w-6xl px-4 sm:p-6 lg:p-8">
      <ProfileBanner
        title="My Profile"
        imageUrl={banner}
        description="Manage your profile information and how others see you on Food Recipe."
      />

      <ProfilePhoto userDetail={userDetail} />

      <PersonalInformation
        userDetail={userDetail}
        continentsData={continentsData}
      />

      <AccountInformation userDetail={userDetail} />
    </div>
  );
}
