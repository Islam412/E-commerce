"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/services/query/auth/useRegisterMutation";

const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => alert("Account created"),
      onError: (err: any) => {
        console.log("REGISTER ERROR FULL:", err);
        console.log("REGISTER ERROR RESPONSE:", err?.response);
        alert("CORS blocked response - check backend CORS");
      },
          });
  };

  return (
    <Box maxWidth={520} mx="auto" mt={6}>
      <Stack spacing={3}>
        <Typography variant="h4">Create Account</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* ✅ Responsive Grid بدون MUI Grid */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              label="First Name"
              fullWidth
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />

            <TextField
              label="Last Name"
              fullWidth
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />

            {/* 👇 خليه ياخد سطر كامل */}
            <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
              <TextField
                label="Username"
                fullWidth
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>

            <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={registerMutation.isPending}
                fullWidth
              >
                {registerMutation.isPending ? "Creating..." : "Register"}
              </Button>
            </Box>

            {registerMutation.isError && (
              <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
                <Typography color="error" variant="body2">
                  {(registerMutation.error as any)?.response?.data?.message ||
                    "Something went wrong"}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
