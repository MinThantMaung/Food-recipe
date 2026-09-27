import { authApi } from "@/api";

type ResendOtpResponse = {
  message?: string;
  token?: string;
};

export async function resendOtp(email: string, token: string) {
  const response = await authApi.post<ResendOtpResponse>("resend-otp", {
    email,
    token,
  });

  return response.data;
}