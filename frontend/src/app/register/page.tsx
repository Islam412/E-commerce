import { Box, Container, Grid, Paper } from "@mui/material";
import RegisterForm from "./LoginForm";

function LoginPage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={8} direction="row-reverse">
        
        {/* Form */}
        <Grid size={{ xs: 12, md: 7, lg: 6 }}>
          <RegisterForm />
        </Grid>

        {/* Image */}
        <Grid size={{ xs: 12, md: 5, lg: 6 }}>
          <Box
            sx={{
              minHeight: "100vh",
              py: 4,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={10}
              component="img"
              src="/assets/images/login.jpg"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
