import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormHelperText } from "@mui/material";
import { loginUser } from "../../config/API";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

interface Error {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<Error>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errors = error;

    switch (name) {
      case "username":
        errors.username = value.length == 0 ? "Please enter your username" : "";
        break;

      case "password":
        errors.password = value.length == 0 ? "Please enter your password" : "";
        break;
    }

    setError(errors);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(user);

      if (response.data) {
        navigate("/users");
        alert("Kuch to hua hai");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: "600px",
        padding: "2rem",
        border: "1px solid #000",
        borderRadius: ".5rem",
        margin: "1rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textTransform: "capitalize", margin: "1rem 0" }}
      >
        Login here
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          name="username"
          sx={{
            margin: "1rem 0",
          }}
          label="Username"
          onChange={handleChange}
          placeholder="e.g. shantanu200"
          required
        />
        <FormHelperText sx={{ color: "red" }}>{error.username}</FormHelperText>
        <TextField
          id="input-with-icon-textfield"
          name="password"
          sx={{
            margin: "1rem 0",
          }}
          label="Password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <FormHelperText sx={{ color: "red" }}>{error.password}</FormHelperText>
        <Button
          sx={{
            padding: ".5rem",
            margin: "1rem 0",
            color: "#fff",
            backgroundColor: "#1B2E35",
            ":hover": {
              backgroundColor: "black",
            },
          }}
          variant="contained"
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
