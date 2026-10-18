import { useMutation } from "@tanstack/react-query";
import { deleteUser, updatePassword, updatePhone, updateProfile } from "./user"; // Adjust to your API file path.

export const useUpdatePhone = () => {
  return useMutation({
    mutationFn: updatePhone,
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
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
  });
};