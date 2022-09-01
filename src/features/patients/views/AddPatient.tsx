import { Box, Typography } from "@mui/material";
import { BreadcrumbsProps } from "layouts/Dashboard/components/Breadcrumbs/Breadcrumbs";
import DashboardLayoutWrapper from "wrappers/DashboardLayoutWrapper";
import { ReactComponent as AddPatientImg } from "images/patient.svg";
import { useFormik } from "formik";
import { useYupTranslation } from "common/useYupTranslation";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import { addNewPatient } from "../patientsSlice";
import { useAppDispatch } from "store/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditPatientForm from "features/patients/components/PatientForm/PatientForm";
import useDocumentTitle from "common/useDocumentTitle";

const breadcrumbs: BreadcrumbsProps[] = [
  {
    label: "dashboard",
    to: "start",
  },
  {
    label: "addPatient",
  },
];

const AddPatient = () => {
  useYupTranslation();
  const { t } = useTranslation(["common", "buttons", "patients"]);

  useDocumentTitle(t("patients:addPatient"));

  const dispatch = useAppDispatch();
  const PHONE_NUM_REGEX = /^[0-9\- ]{8,14}$/;

  const addPatientValidation = Yup.object({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    phoneNumber: Yup.string()
      .matches(PHONE_NUM_REGEX, t("common:form.phoneNumberError"))
      .required(),
    address: Yup.object({
      state: Yup.string().required(),
      city: Yup.string().required(),
      avenue: Yup.string().required(),
    }),
  });

  const addPatientFormik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      address: {
        state: "",
        city: "",
        avenue: "",
      },
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(addNewPatient({ ...values, phoneNumber: +values.phoneNumber }));
      resetForm();
    },
    validationSchema: addPatientValidation,
  });

  return (
    <DashboardLayoutWrapper breadcrumbs={breadcrumbs}>
      <Typography
        component="h1"
        variant="h4"
        textAlign="center"
        textTransform={"capitalize"}
        marginBottom={2}
      >
        {t("patients:addPatient")}
      </Typography>
      <Box
        width="100%"
        boxShadow="3"
        maxWidth={"md"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          borderTop: 5,
          borderColor: "primary.main",
          borderRadius: "8px 8px 0px 0px",
          margin: "0 auto",
        }}
      >
        <AddEditPatientForm
          formikHookName={addPatientFormik}
          heroImg={<AddPatientImg width="100%" height={300} />}
          title={t("patients:patientInfo")}
          actionButtons={
            <>
              <Button
                type="button"
                startIcon={<DeleteIcon />}
                onClick={addPatientFormik.handleReset}
                sx={{ marginTop: "1rem", marginLeft: "1rem", backgroundColor: "action.active" }}
              >
                {t("buttons:clear")}
              </Button>
              <Button
                // @ts-ignore
                component={Link}
                to="/allPatients"
                type="button"
                startIcon={<ArrowBackIcon />}
                sx={{
                  marginTop: "1rem",
                  marginLeft: "1rem",
                  backgroundColor: "action.active",
                }}
              >
                {t("buttons:return")}
              </Button>
            </>
          }
        />
      </Box>
    </DashboardLayoutWrapper>
  );
};

export default AddPatient;
