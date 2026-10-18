
import { authApi } from ".";
export type UpdatePasswordInput = {
  currentPassword: string;
  password: string;
};

export const updatePhone = async (phone: string) => {
  const response = await authApi.patch("/phone", { phone });

  return response.data;
};

export const updatePassword = async ({
  currentPassword,
  password,
}: UpdatePasswordInput) => {
  const response = await authApi.patch("/updatePassword", {
    currentPassword,
    password,
  });

  return response.data;
};

export const deleteUser = async () => {
  const response = await authApi.delete("/user");
  return response.data;
};

export const updateProfile = async (formData: FormData) => {
  const response = await authApi.patch("/update-user", formData);
  return response.data;
};