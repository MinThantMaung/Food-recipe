import banner from "../assets/profileBanner.png";

import { ProfileBanner } from "@/features/recipes/components/ProfileBanner";
import { ProfilePhoto } from "@/features/recipes/components/profile/ProfilePhoto";
import { PersonalInformation } from "@/features/recipes/components/profile/PersonalInformation";
import { AccountInformation } from "@/features/recipes/components/profile/AccountInformation";
import { useState } from "react";
import { continentsQuery, userProfileQuery } from "@/api/useUser";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Profile() {
  const { data: userDetail } = useSuspenseQuery(userProfileQuery());

  const { data: continentsData } = useSuspenseQuery(continentsQuery());

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="mx-auto h-full min-h-0 w-full max-w-6xl px-4 sm:p-6 lg:p-8">
      <ProfileBanner
        title="My Profile"
        imageUrl={banner}
        description="Manage your profile information and how others see you on Food Recipe."
      />

      <ProfilePhoto userDetail={userDetail} onPhotoChange={setSelectedFile} />

      <PersonalInformation
        userDetail={userDetail}
        continentsData={continentsData}
        selectedFile={selectedFile}
      />

      <AccountInformation userDetail={userDetail} />
    </div>
  );
}
