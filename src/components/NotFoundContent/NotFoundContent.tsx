import { ReactComponent as NoPatientData } from "images/no-patient.svg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "styles/theme";
import { useTranslation } from "react-i18next";

const NotFoundContent = ({ returnPath }: { returnPath: string }) => {
  const { t } = useTranslation(["buttons", "patients"]);

  return (
    <>
      <Box width="100%" mt={2} display="flex" justifyContent="center" alignItems="center">
        <NoPatientData width="100%" height={300} style={{ maxWidth: "300px" }} />
      </Box>
      <Typography mt={4} mb={2} component="p" variant="h5" color="error.light" textAlign="center">
        {t("patients:editPatientError")}
      </Typography>
      <Link
        to={returnPath}
        style={{
          display: "block",
          margin: "2rem auto",
          textTransform: "uppercase",
          color: `${theme.palette.primary.main}`,
          fontWeight: "bold",
        }}
      >
        {t("buttons:return")}
      </Link>
    </>
  );
};

export default NotFoundContent;
