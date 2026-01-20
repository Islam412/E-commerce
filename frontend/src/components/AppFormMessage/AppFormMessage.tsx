"use client";

import * as React from "react";
import { Alert, AlertColor, Collapse } from "@mui/material";

type AppFormMessageProps = {
  open: boolean;
  type?: AlertColor;
  message: string;
  autoHideDuration?: number; // ms
};

export default function AppFormMessage({
  open,
  type = "success",
  message,
  autoHideDuration = 3000,
}: AppFormMessageProps) {
  const [visible, setVisible] = React.useState(open);

  React.useEffect(() => {
    setVisible(open);

    if (open && autoHideDuration) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration]);

  return (
    <Collapse in={visible}>
      <Alert
        severity={type}
        sx={{
          borderRadius: 12,
          fontSize: 14,
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
