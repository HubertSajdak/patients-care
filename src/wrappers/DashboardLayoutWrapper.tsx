import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardLayout from "layouts/Dashboard/DashboardLayout";
import { ReactComponent as Logo } from "images/logo.svg";
import { BreadcrumbsProps } from "layouts/Dashboard/components/Breadcrumbs/Breadcrumbs";
import { SidebarLinksProps } from "layouts/Dashboard/components/SidebarItem/SidebarItem";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store/hooks";
export interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbsProps[];
}

const DashboardLayoutWrapper = ({ children, breadcrumbs }: DashboardLayoutWrapperProps) => {
  const { t } = useTranslation("translation");
  const { name, surname, avatar } = useAppSelector((state) => state.user);
  const sidebarLinks: SidebarLinksProps[] = [
    {
      variant: "base",
      text: t("sidebar.start"),
      path: "/start",
      icon: <PlayArrowIcon />,
    },
    {
      variant: "submenu",
      text: t("sidebar.patients"),
      icon: <GroupIcon />,
      sublinks: [
        {
          text: t("sidebar.allPatients"),
          path: "/allPatients",
          subIcon: <GroupsIcon />,
        },
        {
          text: t("sidebar.addPatient"),
          path: "/addPatient",
          subIcon: <PersonAddIcon />,
        },
      ],
    },
    {
      variant: "submenu",
      text: t("sidebar.settings"),
      icon: <SettingsIcon />,
      sublinks: [
        {
          text: t("sidebar.accountManagement"),
          path: "/accountManagement",
          subIcon: <PersonIcon />,
        },
      ],
    },
  ];
  return (
    <DashboardLayout
      sidebarLinks={sidebarLinks}
      breadcrumbs={breadcrumbs}
      img={<Logo width={200} height={50} />}
      userInfo={{ name, surname, avatar }}
      children={children}
    />
  );
};

export default DashboardLayoutWrapper;
