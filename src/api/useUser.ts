import { queryOptions, useMutation } from "@tanstack/react-query";
import { deleteUser, updatePassword, updatePhone, updateProfile } from "./user"; // Adjust to your API file path.
import { getContinents, getUserById } from "./recipes";
import { queryClient } from "./queryClient";

export const useUpdatePhone = () => {
  return useMutation({
    mutationFn: updatePhone,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userProfileQuery().queryKey,
      });
    },
  });
};
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userProfileQuery().queryKey,
      });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userProfileQuery().queryKey,
      });
    },
  });
};

export const userProfileQuery = () =>
  queryOptions({
    queryKey: ["userProfile"],
    queryFn: getUserById,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

export const continentsQuery = () =>
  queryOptions({
    queryKey: ["getContinents"],
    queryFn: getContinents,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });