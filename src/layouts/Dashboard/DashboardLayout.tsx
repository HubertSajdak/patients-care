import { Wrapper } from "./DashboardLayout.styled";
import Navbar from "layouts/Dashboard/components/Navbar/Navbar";
import Sidebar from "layouts/Dashboard/components/Sidebar/Sidebar";
import Breadcrumbs, {
  BreadcrumbsProps,
} from "layouts/Dashboard/components/Breadcrumbs/Breadcrumbs";
import { useState } from "react";
import { NavbarProps } from "layouts/Dashboard/components/Navbar/Navbar";
import { MobileSidebarWrapper, DesktopSidebarWrapper } from "./components/Sidebar/Sidebar.styled";
import { SidebarLinksProps } from "./components/SidebarItem/SidebarItem";
import { Box } from "@mui/material";

export interface DashboardLayoutProps {
  sidebarLinks: SidebarLinksProps[];
  breadcrumbs: BreadcrumbsProps[];
  img: React.ReactNode;
  userInfo: NavbarProps["userInfo"];
  children: React.ReactNode;
}
const DashboardLayout = ({
  sidebarLinks,
  breadcrumbs,
  img,
  userInfo,
  children,
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Wrapper>
      <main className="dashboard">
        <DesktopSidebarWrapper>
          <Sidebar links={sidebarLinks} isSidebarOpen={isSidebarOpen} img={img} />
        </DesktopSidebarWrapper>
        <MobileSidebarWrapper open={isSidebarOpen} onClose={toggleSidebar} variant="temporary">
          <Sidebar links={sidebarLinks} isSidebarOpen={isSidebarOpen} img={img} />
        </MobileSidebarWrapper>
        <div>
          <Navbar
            isSidebarOpen={isSidebarOpen}
            openSidebarHandler={toggleSidebar}
            userInfo={userInfo}
          />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Box sx={{ width: "100%", margin: "0 auto", padding: "2rem 1rem" }}>{children}</Box>
        </div>
      </main>
    </Wrapper>
  );
};

export default DashboardLayout;
