"use client";

import { Button, ButtonProps, CircularProgress } from "@mui/material";

type AppButtonProps = ButtonProps & {
  loading?: boolean;
};

export default function AppButton({
  loading = false,
  children,
  disabled,
  sx,
  ...props
}: AppButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      sx={{
        height: 52,
        borderRadius: 3,
        fontWeight: 600,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={22} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
}
