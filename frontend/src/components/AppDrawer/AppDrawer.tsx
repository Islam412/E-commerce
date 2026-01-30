"use client";

import * as React from "react";
import Drawer, { DrawerProps } from "@mui/material/Drawer";

type AppDrawerProps = DrawerProps & {
  width?: number;
};

export default function AppDrawer({
  width = 280,
  PaperProps,
  sx,
  children,
  ...props
}: AppDrawerProps) {
  return (
    <Drawer
      {...props}
      PaperProps={{
        ...PaperProps,
        sx: {
          width,
          borderRadius: 0,
          ...(PaperProps?.sx || {}),
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0.45)",
        },
        ...sx,
      }}
    >
      {children}
    </Drawer>
  );
}
