import { authApi } from ".";

export const updatePhone = async (phone: string) => {
  const response = await authApi.patch("/phone", { phone });

  return response.data;
};