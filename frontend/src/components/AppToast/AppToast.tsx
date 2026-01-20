"use client";

import * as React from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

type AppToastProps = {
  open: boolean;
  message: string;
  type?: AlertColor;
  autoHideDuration?: number;
  onClose: () => void;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
};

export default function AppToast({
  open,
  message,
  type = "success",
  autoHideDuration = 3000,
  onClose,
  anchorOrigin = { vertical: "top", horizontal: "right" },
}: AppToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
      anchorOrigin={anchorOrigin}
      // ✅ ده اللي بيحل المشكلة
      sx={{
        position: "fixed",
        zIndex: (theme) => theme.zIndex.modal + 1,
        mt: 2,
        mr: 2,
      }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="outlined"
        sx={{
          borderRadius: 12,
          fontSize: 14,
          alignItems: "center",
          bgcolor: type === "error" ? "error.lighter" : "success.lighter",

        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
