import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    setError("");

    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);

        setMessage(result);
        setOpen(true);

        setFormState(0);
        setName("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        {/* Left Side */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: { xs: "none", sm: "block" },
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(2,132,199,0.55))",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(https://source.unsplash.com/random?technology)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
            }}
          />

          <Box
            sx={{
              position: "relative",
              height: "100%",
              p: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                mb: 2,
                width: "fit-content",
                px: 2,
                py: 1,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
            >
              Secure Video Conferencing
            </Box>

            <Box
              sx={{
                fontSize: 36,
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Join calls with a clean,
              <br />
              professional experience.
            </Box>

            <Box sx={{ mt: 2, maxWidth: 400 }}>
              Login or create an account to start meeting instantly.
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={8}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#0f172a",
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Button
                  fullWidth
                  variant={formState === 0 ? "contained" : "text"}
                  onClick={() => setFormState(0)}
                >
                  Login
                </Button>

                <Button
                  fullWidth
                  variant={formState === 1 ? "contained" : "text"}
                  onClick={() => setFormState(1)}
                >
                  Register
                </Button>
              </Box>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  value={name}
                    autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
               autoComplete="off"

                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={password}
                  autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Create Account"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="success"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}