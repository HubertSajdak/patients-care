import Typography from "@mui/material/Typography";
import useDocumentTitle from "common/useDocumentTitle";
import { BreadcrumbsProps } from "layouts/Dashboard/components/Breadcrumbs/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store/hooks";
import DashboardLayoutWrapper from "wrappers/DashboardLayoutWrapper";
const breadcrumbs: BreadcrumbsProps[] = [
  {
    label: "dashboard",
    to: "start",
  },
  {
    label: "start",
  },
];

const Welcome = () => {
  const { t } = useTranslation("translation");
  useDocumentTitle(t("start"));
  const { name, surname } = useAppSelector((state) => state.user);
  return (
    <DashboardLayoutWrapper breadcrumbs={breadcrumbs}>
      <Typography
        component="h1"
        variant="h4"
        textAlign={"center"}
        width="100%"
        textTransform="capitalize"
      >
        {t(`welcomePage.welcome`)}
        {` ${name} ${surname}`}
      </Typography>
    </DashboardLayoutWrapper>
  );
};

export default Welcome;
