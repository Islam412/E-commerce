"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import AppButton from "@/components/AppButton/AppButton";
import AppDrawer from "@/components/AppDrawer/AppDrawer";
import NextLinkComposed from "@/components/NextLinkComposed/NextLinkComposed";
import AppToast from "@/components/AppToast/AppToast";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");

  // ✅ اربطهم بكونتكست السلة/المفضلة عندك
  const cartCount = 0;
  const favCount = 0;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const requireAuthOrToast = (path: string) => {
    if (!isAuthenticated) {
      setToastMsg("Login to use Cart & Favorites");
      setToastOpen(true);
      return;
    }
    router.push(path);
    closeDrawer();
  };

  const iconPillSx = {
    borderRadius: 999,
    width: 42,
    height: 42,
    border: "1px solid rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.08)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="primary"
        elevation={0}
        sx={{
          color: "primary.contrastText",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(10px)",
          backgroundImage: "linear-gradient(180deg, rgba(0,31,84,0.95), rgba(0,31,84,0.92))",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2, minHeight: 70 }}>
          {/* Left: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component={NextLinkComposed}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Image src="/images/logo/Logo.png" alt="Logo" width={30} height={30} priority />
              {!isMobile && (
                <Typography sx={{ fontWeight: 950, letterSpacing: 0.2, color: "inherit" }}>
                  moveabrand
                </Typography>
              )}
            </Box>
          </Box>

          {/* Center: Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Button
                    key={item.href}
                    component={NextLinkComposed}
                    href={item.href}
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      fontWeight: 900,
                      px: 2,
                      height: 40,
                      borderRadius: 999,
                      opacity: active ? 1 : 0.92,
                      backgroundColor: active ? "rgba(255,255,255,0.14)" : "transparent",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* Right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Desktop: Favorites + Cart */}
            {!isMobile && (
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Tooltip title="Favorites" arrow>
                  <IconButton
                    color="inherit"
                    onClick={() => requireAuthOrToast("/favorites")}
                    sx={iconPillSx}
                  >
                    <Badge badgeContent={favCount} color="secondary" overlap="circular">
                      <FavoriteBorderOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Cart" arrow>
                  <IconButton
                    color="inherit"
                    onClick={() => requireAuthOrToast("/cart")}
                    sx={iconPillSx}
                  >
                    <Badge badgeContent={cartCount} color="secondary" overlap="circular">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Stack>
            )}

            {!isMobile ? (
              isAuthenticated ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 900, opacity: 0.95 }}>
                    👋 {user?.username ?? "Account"}
                  </Typography>

                  <AppButton
                    variant="text"
                    component={NextLinkComposed}
                    href="/account"
                    sx={{
                      height: 42,
                      borderRadius: 999,
                      px: 2,
                      color: "primary.contrastText",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
                    }}
                  >
                    My Account
                  </AppButton>
                </Stack>
              ) : (
                <AppButton
                  variant="contained"
                  component={NextLinkComposed}
                  href="/login"
                  sx={{
                    height: 42,
                    borderRadius: 999,
                    px: 2.5,
                    fontWeight: 950,
                    backgroundColor: "rgba(255,255,255,0.92)",
                    color: "primary.main",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  }}
                >
                  Login
                </AppButton>
              )
            ) : (
              <IconButton edge="end" onClick={openDrawer} aria-label="menu" color="inherit" sx={iconPillSx}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <AppDrawer anchor="right" open={open} onClose={closeDrawer} width={340}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Drawer Header */}
          <Box sx={{ p: 2, pb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Image src="/images/logo/Logo.png" alt="Logo" width={28} height={28} />
                <Typography sx={{ fontWeight: 950 }}>moveabrand</Typography>
              </Box>

              <IconButton onClick={closeDrawer} aria-label="close" sx={{ borderRadius: 999 }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              {isAuthenticated ? `👋 ${user?.username ?? "Account"}` : "Login to access Cart & Favorites."}
            </Typography>
          </Box>

          <Divider />

          {/* Mobile Shortcuts */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Stack direction="row" spacing={1}>
              <AppButton
                fullWidth
                variant="outlined"
                onClick={() => requireAuthOrToast("/favorites")}
                sx={{ height: 44, borderRadius: 999, fontWeight: 900 }}
              >
                Favorites ({favCount})
              </AppButton>

              <AppButton
                fullWidth
                variant="contained"
                onClick={() => requireAuthOrToast("/cart")}
                sx={{ height: 44, borderRadius: 999, fontWeight: 950 }}
              >
                Cart ({cartCount})
              </AppButton>
            </Stack>
          </Box>

          <Divider />

          {/* Nav */}
          <List sx={{ py: 1 }}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <ListItemButton
                  key={item.href}
                  component={NextLinkComposed}
                  href={item.href}
                  onClick={closeDrawer}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 2,
                    backgroundColor: active ? "rgba(0,31,84,0.06)" : "transparent",
                    "&:hover": { backgroundColor: "rgba(0,31,84,0.08)" },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: active ? 950 : 800 }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Divider />

          {/* Bottom Actions */}
          <Box sx={{ p: 2, mt: "auto" }}>
            {isAuthenticated ? (
              <Stack spacing={1}>
                <AppButton
                  fullWidth
                  variant="contained"
                  component={NextLinkComposed}
                  href="/account"
                  onClick={closeDrawer}
                  sx={{ height: 46, borderRadius: 999, fontWeight: 950 }}
                >
                  My Account
                </AppButton>

                <AppButton
                  fullWidth
                  variant="text"
                  component={NextLinkComposed}
                  href="/shop"
                  onClick={closeDrawer}
                  sx={{ height: 46, borderRadius: 999, fontWeight: 900 }}
                >
                  Start Shopping
                </AppButton>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <AppButton
                  fullWidth
                  variant="contained"
                  component={NextLinkComposed}
                  href="/login"
                  onClick={closeDrawer}
                  sx={{ height: 46, borderRadius: 999, fontWeight: 950 }}
                >
                  Login
                </AppButton>

                <AppButton
                  fullWidth
                  variant="text"
                  component={NextLinkComposed}
                  href="/shop"
                  onClick={closeDrawer}
                  sx={{ height: 46, borderRadius: 999, fontWeight: 900 }}
                >
                  Browse Products
                </AppButton>
              </Stack>
            )}

            <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary" }}>
              © {new Date().getFullYear()} E Commerce
            </Typography>
          </Box>
        </Box>
      </AppDrawer>

      <AppToast
        open={toastOpen}
        message={toastMsg}
        type="error"
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}
