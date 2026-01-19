import { registerUser, RegisterValues } from "@/services/api/auth/register";
import { useMutation } from "@tanstack/react-query";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterValues) => registerUser(payload),
  });
}
