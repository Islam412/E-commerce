import { Box, Container, Grid, Typography } from "@mui/material";
import RegisterForm from "./LoginForm";
import { Suspense } from "react";

function LoginPage() {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Image Section */}
        <Grid
          size={{ xs: 12, md: 5, lg: 6 }}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            p: { md: 3, lg: 4 }, // 👈 padding للعمود
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: "calc(100vh - 48px)",
              borderRadius: 6, // 👈 كارد ناعم
              overflow: "hidden",
              boxShadow: "0 18px 60px rgba(0,0,0,0.25)",

              backgroundImage: `url("/images/auth/register.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",

              // Overlay أشيك
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)",
              },
            }}
          >
            {/* Optional Text Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "common.white",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  maxWidth: 360,
                }}
              >
                Made
                <br />
                to move with you
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Form Section (بدون Box) */}
        <Grid
          size={{ xs: 12, md: 7, lg: 6 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 4, md: 0 },
            backgroundColor: "background.default",

            "& > *": {
              transform: { md: "translateY(-10px)" },
            },
          }}
        >
                    <Suspense fallback={null}>
                    <RegisterForm />

                    </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
