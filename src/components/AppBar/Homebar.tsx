import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingIcon from "@mui/icons-material/SettingsAccessibility";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../config/API";

interface User {
  username: string;
}


const pages = [
  {
    label: "Data",
    link: "/data",
  },
  {
    label: "Levels",
    link: "/level",
  },
  {
    label: "Users",
    link: "/users",
  },
  {
    label: "Login",
    link: "/",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    async function fetchUser() {
      const response = await getUser(String(token));

      if (response) {
        setUser(response.data);
      }
    }
    fetchUser();
  }, [token]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link: string) => {
    setAnchorElNav(null);
    navigate(link);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{ background: "#333" }}
      position={"sticky"}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SettingIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#fff",fontSize: '2rem' }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Source Sans 3",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            PersonalityGenix
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCloseNavMenu(page.link)}
                >
                  <Typography
                    color={"#fff"}
                    sx={{
                      textDecoration: "none",
                    }}
                    textAlign="center"
                    component="a"
                    href={page.link}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SettingIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#fff" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#fff",
              textDecoration: "none",
              
            }}
          >
            PersonalityGenix
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ my: 2, color: "#fff", display: "block",fontSize:'16px' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {!token ? (
            <Button
              variant="contained"
              sx={{
                margin: "1rem 0",
                color: "#fff",
                backgroundColor: "#1B2E35",
                ":hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.username.toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
