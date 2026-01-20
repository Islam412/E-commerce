"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import AppTextField from "@/components/AppTextField/AppTextField";
import AppButton from "@/components/AppButton/AppButton";
import AppToast from "@/components/AppToast/AppToast";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address (e.g. name@example.com)"),
  password: z.string().min(4, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [toast, setToast] = React.useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (payload: LoginValues) => {
    closeToast();

    const res = await signIn("credentials", {
      ...payload,
      redirect: false, // ✅ نخلي التحكم عندنا
      callbackUrl,
    });

    if (!res) {
      setToast({
        open: true,
        type: "error",
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    if (res.error) {
      setToast({
        open: true,
        type: "error",
        message: "Invalid email or password.",
      });
      return;
    }

    setToast({
      open: true,
      type: "success",
      message: "Logged in successfully",
    });

    reset();
    router.push(res.url || callbackUrl);
  };

  return (
    <>
<Box
  width="100%"
  mx="auto"
  mt={{ xs: 4, sm: 6 }}
  px={{ xs: 2, sm: 0 }} // padding للموبايل
>
<Stack spacing={3}>
          <Stack spacing={0.75}>
            <Typography variant="h4" fontWeight={800}>
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Log in to access your account.
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <AppTextField<LoginValues>
                name="email"
                control={control}
                label="Email"
                type="email"
              />

              <AppTextField<LoginValues>
                name="password"
                control={control}
                label="Password"
                type="password"
              />

              <AppButton
                type="submit"
                variant="contained"
                fullWidth
                loading={isSubmitting}

              >
                Login
              </AppButton>

              <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  style={{
                    fontWeight: 700,
                    textDecoration: "none",
                    textUnderlineOffset: "3px",
                    color: "var(--mui-palette-primary-main)",
                  }}
                >
                  Create one
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <AppToast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}