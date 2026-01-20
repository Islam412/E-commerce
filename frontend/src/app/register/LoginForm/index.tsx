"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/services/query/auth/useRegisterMutation";
import AppTextField from "@/components/AppTextField/AppTextField";
import AppButton from "@/components/AppButton/AppButton";
import AppToast from "@/components/AppToast/AppToast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address (e.g. name@example.com)"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const registerMutation = useRegisterMutation();

  const [toast, setToast] = React.useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const { control, handleSubmit, reset } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const router = useRouter();


  const onSubmit = (data: RegisterValues) => {
    // ✅ ما نبعتش confirm_password للباك
    const { confirm_password, ...payload } = data;

    // ✅ اقفل أي Toast قديم
    closeToast();

    registerMutation.mutate(payload, {
      onSuccess: () => {
        setToast({
          open: true,
          type: "success",
          message: "Your account has been created successfully ",
        });
        reset();
        router.push("/login");

      },
      onError: (err: unknown) => {
        const msg = axios.isAxiosError(err)
          ? (err.response?.data as { message?: string })?.message ||
            err.message ||
            "Something went wrong. Please try again."
          : err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      
        setToast({
          open: true,
          type: "error",
          message: msg,
        });
      },
      
    });
  };

  return (
    <>
      <Box maxWidth={520} mx="auto" mt={{ xs: 4, sm: 6 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack spacing={0.75}>
            <Typography variant="h4" fontWeight={800}>
              Create your account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign up to access all your data.
            </Typography>
          </Stack>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <AppTextField<RegisterValues>
                  name="first_name"
                  control={control}
                  label="First Name"
                />
                <AppTextField<RegisterValues>
                  name="last_name"
                  control={control}
                  label="Last Name"
                />
              </Stack>

              <AppTextField<RegisterValues>
                name="username"
                control={control}
                label="Username"
              />

              <AppTextField<RegisterValues>
                name="email"
                control={control}
                label="Email"
                type="email"
              />

              <AppTextField<RegisterValues>
                name="password"
                control={control}
                label="Password"
                type="password"
              />

              <AppTextField<RegisterValues>
                name="confirm_password"
                control={control}
                label="Confirm Password"
                type="password"
              />

<AppButton
  type="submit"
  variant="contained"
  fullWidth

  loading={registerMutation.isPending}
>
  Create account
</AppButton>

<Typography
  variant="body2"
  textAlign="center"
  sx={{ mt: 1 }}
>
  Already have an account?{" "}
  <Link
    href="/login"
    style={{
      fontWeight: 700,
      textDecoration: "none",
      textUnderlineOffset: "3px",
      color: "var(--mui-palette-primary-main)",
    }}
  >
    Login
  </Link>
</Typography>

            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ✅ Toast */}
      <AppToast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // غيّرها لو عايز bottom-right
      />
    </>
  );
}
