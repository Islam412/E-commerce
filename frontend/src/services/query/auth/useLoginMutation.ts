import { loginUser, LoginValues } from "@/services/api/auth/login";
import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginValues) => loginUser(payload),
  });
}
