import { useMutation } from "@tanstack/react-query";
import { updatePhone } from "./user"; // Adjust to your API file path.

export const useUpdatePhone = () => {
  return useMutation({
    mutationFn: updatePhone,
  });
};