import { Box, CircularProgress, Typography } from "@mui/material";
import { BreadcrumbsProps } from "layouts/Dashboard/components/Breadcrumbs/Breadcrumbs";
import DashboardLayoutWrapper from "wrappers/DashboardLayoutWrapper";
import { ReactComponent as EditPatientImg } from "images/edit-patient.svg";
import { useFormik } from "formik";
import { useYupTranslation } from "common/useYupTranslation";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Button from "components/Button/Button";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { editPatient, getSinglePatient } from "../patientsSlice";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import AddEditPatientForm from "features/patients/components/PatientForm/PatientForm";
import useDocumentTitle from "common/useDocumentTitle";
import NotFoundContent from "components/NotFoundContent/NotFoundContent";

const breadcrumbs: BreadcrumbsProps[] = [
  {
    label: "dashboard",
    to: "start",
  },
  {
    label: "allPatients",
    to: "allPatients",
  },
  {
    label: "editPatient",
  },
];
const EditPatient = () => {
  useYupTranslation();

  const { t } = useTranslation(["common", "buttons", "patients"]);
  useDocumentTitle(t("patients:editPatient"));
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useAppSelector((state) => state.patients.singlePatientData);

  const params = useParams();

  useEffect(() => {
    if (!params.patientId) return;
    dispatch(getSinglePatient(params.patientId));
  }, [dispatch, params.patientId, params]);

  const PHONE_NUM_REGEX = /^[0-9\- ]{8,14}$/;

  const editPatientValidation = Yup.object({
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

  const editPatientFormik = useFormik({
    initialValues: {
      patientId: data?._id || "",
      name: data?.name || "",
      surname: data?.surname || "",
      phoneNumber: data?.phoneNumber || "",
      address: {
        state: data?.address.state || "",
        city: data?.address.city || "",
        avenue: data?.address.avenue || "",
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(editPatient({ ...values, phoneNumber: +values.phoneNumber }));
    },
    validationSchema: editPatientValidation,
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
        {t("patients:editPatient")}
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
        {isLoading ? (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.7)",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </div>
        ) : isError ? (
          <NotFoundContent returnPath="/allPatients" />
        ) : (
          <AddEditPatientForm
            formikHookName={editPatientFormik}
            heroImg={<EditPatientImg width="100%" height={300} />}
            title={t("patients:patientInfo")}
            actionButtons={
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
            }
          />
        )}
      </Box>
    </DashboardLayoutWrapper>
  );
};

export default EditPatient;
