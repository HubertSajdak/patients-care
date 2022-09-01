import { List } from "@mui/material";
import Box from "@mui/material/Box";
import SidebarItem, { SidebarLinksProps } from "../SidebarItem/SidebarItem";
import { Wrapper, LogoContainerWrapper } from "./Sidebar.styled";
interface SidebarProps {
  links: SidebarLinksProps[];
  isSidebarOpen: boolean;
  img: React.ReactNode;
}
const Sidebar = ({ links, isSidebarOpen, img }: SidebarProps) => {
  return (
    <Wrapper isActive={isSidebarOpen}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "14px 0",
          alignItems: "center",
        }}
      >
        <LogoContainerWrapper>{img}</LogoContainerWrapper>
      </Box>
      <Box sx={{ width: "240px", position: "sticky", top: 0 }}>
        <List>
          {links.map((link, index) => {
            return <SidebarItem key={index} {...link} />;
          })}
        </List>
      </Box>
    </Wrapper>
  );
};

export default Sidebar;
