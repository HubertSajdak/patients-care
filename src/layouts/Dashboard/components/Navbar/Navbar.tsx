import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar } from "@mui/material";
import { useTranslation } from "react-i18next";
import LangSwitcher from "components/LangSwitcher/LangSwitcher";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "features/auth/authSlice";
export interface NavbarProps {
  /**
   * Use "t" from "useTranslation" hook and pass translation key inside navbarSettings prop.
   * 
   * @example 
   *  <DashboardLayout
      navbarSettings={[`${t("navbar.settings.profile")}`, `${t("navbar.settings.logout")}`]}
      sidebarLinks={sidebarLinks}
      breadcrumbs={breadcrumbs}
      img={<Logo width={200} height={50} />}
      userInfo={userInfo}
      children={children}
    />
   */
  isSidebarOpen: boolean;
  openSidebarHandler: () => void;
  userInfo: {
    avatar?: string;
    name: string;
    surname: string;
  };
}
const Navbar = ({ isSidebarOpen, openSidebarHandler, userInfo }: NavbarProps) => {
  const { t } = useTranslation("translation");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUserAndRedirect = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={openSidebarHandler}
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Box mr={2} sx={{ display: "flex", gap: "0.5rem" }}>
            <Typography variant="body1">{userInfo.name}</Typography>
            <Typography variant="body1">{userInfo.surname}</Typography>
          </Box>
          <Box>
            <Tooltip title={t("navbar.settings.openSettings")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={`${userInfo.name} ${userInfo.surname}`} src={userInfo.avatar} />
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
              <MenuItem sx={{ padding: 0 }}>
                <Link
                  to="/accountManagement"
                  style={{
                    width: "100%",
                    color: "#486581",
                    textTransform: "capitalize",
                    padding: "6px 16px",
                  }}
                >
                  {t("navbar.settings.profile")}
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutUserAndRedirect}>
                <Typography
                  textAlign="center"
                  sx={{
                    textTransform: "capitalize",
                    color: "#486581",
                  }}
                >
                  {t("navbar.settings.logout")}
                </Typography>
              </MenuItem>
              <LangSwitcher variant="link" />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
