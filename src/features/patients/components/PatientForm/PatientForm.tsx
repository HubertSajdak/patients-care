import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TextFieldFormik from "components/TextFieldFormik/TextFieldFormik";
import { FormikContextType, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import Button from "components/Button/Button";
export interface AddEditPatientFormProps<T> {
  /**
   * Pass the name of a formik hook you refer to.
   */
  formikHookName: FormikContextType<T>;
  /**
   * Pass the hero image of a form.
   */
  heroImg?: React.ReactNode;
  /**
   * Pass additional action buttons
   * 
   * @example Reset Button
   * 
   *   <Butto onClick={addPatientFormik.handleReset}>
          clear
        </Button>
   * 
   */
  actionButtons?: React.ReactNode;
  /**
   * Pass the title of a from.
   */
  title: string;
}
const AddEditPatientForm = <T,>({
  formikHookName,
  heroImg,
  actionButtons,
  title,
}: AddEditPatientFormProps<T>) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Box maxWidth={300}>{heroImg}</Box>
      <Card sx={{ width: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormikProvider value={formikHookName}>
            <form onSubmit={formikHookName.handleSubmit}>
              <Typography
                component="h2"
                variant="h5"
                textAlign={"left"}
                mb={2}
                sx={{ textTransform: "capitalize" }}
              >
                {title}
              </Typography>
              <Grid
                container
                columnSpacing={2}
                rowSpacing={1.5}
                sx={{ display: "flex", marginBottom: "1rem" }}
              >
                <Grid item xs={12} sm={6} md={4} minHeight="100px">
                  <TextFieldFormik id="name" label={t("common:form.name")} name="name" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} minHeight="100px">
                  <TextFieldFormik id="surname" label={t("common:form.surname")} name="surname" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} minHeight="100px">
                  <TextFieldFormik
                    id="phoneNumber"
                    label={t("common:form.phoneNumber")}
                    name="phoneNumber"
                    type="tel"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} minHeight="100px">
                  <TextFieldFormik id="state" label={t("common:form.state")} name="address.state" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} minHeight="100px">
                  <TextFieldFormik id="city" label={t("common:form.city")} name="address.city" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} minHeight="100px">
                  <TextFieldFormik
                    id="avenue"
                    label={t("common:form.avenue")}
                    name="address.avenue"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                isSubmitting={formikHookName.isSubmitting}
                startIcon={<TaskAltIcon />}
                sx={{ marginTop: "1rem" }}
              >
                {t("common:form.submitButton")}
              </Button>
              {actionButtons}
            </form>
          </FormikProvider>
        </CardContent>
      </Card>
    </>
  );
};

export default AddEditPatientForm;
