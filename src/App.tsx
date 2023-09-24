import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Users from "./pages/User/Users";
import Level from "./pages/Levels/Level";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/level" element={<Level />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
