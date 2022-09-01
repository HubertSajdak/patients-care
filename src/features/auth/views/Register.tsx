import BasePageLayout from "layouts/BasePageLayout/BasePageLayout";
import { ReactComponent as Logo } from "images/logo.svg";
import { Box, Grid, Typography } from "@mui/material";
import TextFieldFormik from "components/TextFieldFormik/TextFieldFormik";
import PasswordFieldFormik from "components/PasswordFieldFormik/PasswordFieldFormik";
import { useFormik, FormikProvider } from "formik";
import RegisterImg from "images/register.svg";
import Button from "components/Button/Button";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useYupTranslation } from "common/useYupTranslation";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from "utils/localStorage/localStorage";
import { registerUser } from "../authSlice";
import { useEffect } from "react";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "routes/PrivateRoute";
import { authActions } from "../authSlice";
import CheckboxFormik from "components/CheckboxFormik/CheckboxFormik";
import pdf from "documents/Terms.pdf";
import useDocumentTitle from "common/useDocumentTitle";
const Register = () => {
  useYupTranslation();
  const { t } = useTranslation(["common", "registerPage"]);
  const dispatch = useAppDispatch();
  useDocumentTitle(t("registerPage:header"));
  const { isRegistrationSuccessful } = useAppSelector((state) => state.auth);
  const token = getTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentTime = new Date().getTime();
  const decodedAccessToken = decodeToken<DecodedToken["accessToken"]>(token!);
  const decodedRefreshToken = decodeToken<DecodedToken["refreshToken"]>(refreshToken!);
  useEffect(() => {
    if (isRegistrationSuccessful) {
      navigate("/login");
      dispatch(authActions.resetRegistrationState());
    }
  }, [dispatch, isRegistrationSuccessful, navigate]);
  const registerValidation = Yup.object({
    name: Yup.string().min(2).required(),
    surname: Yup.string().min(2).required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null]),
    termsAndConditions: Yup.boolean().oneOf([true], t("common:form.termsAndConditionsError")),
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
    onSubmit: async (values) => {
      await dispatch(registerUser({ ...values, repeatedPassword: values.confirmPassword }));
    },
    validationSchema: registerValidation,
  });

  const label = (
    <Typography>
      {t("common:form.iAgreeOn")}{" "}
      <a href={pdf} target="_blank" rel="noreferrer" style={{ color: "royalblue" }}>
        {t("common:form.terms")}
      </a>{" "}
      {t("common:form.conditions")}
    </Typography>
  );

  if (
    token &&
    decodedAccessToken &&
    currentTime / 1000 < decodedAccessToken.exp &&
    decodedRefreshToken &&
    currentTime / 1000 < decodedRefreshToken.exp
  ) {
    return <Navigate to={`${location.state ? location.state : "/start"}`} />;
  }
  return (
    <BasePageLayout img={<Logo width={"100%"} />}>
      <Box
        boxShadow={3}
        maxWidth={800}
        marginY="0.5rem"
        sx={{
          display: "flex",
          backgroundColor: "common.white",
          borderTop: 5,
          borderColor: "primary.main",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <Box minWidth={350} maxWidth={350} padding={2} display={{ xs: "none", md: "block" }}>
          <img
            width={"100%"}
            height={"100%"}
            src={RegisterImg}
            alt="a woman holding a form illustration"
          />
        </Box>
        <Box padding={2}>
          <Typography
            marginY={2}
            textAlign="center"
            component="h1"
            variant="h4"
            textTransform="capitalize"
          >
            {t("registerPage:header")}
          </Typography>
          <FormikProvider value={registerFormik}>
            <form onSubmit={registerFormik.handleSubmit} style={{ maxWidth: "520px" }}>
              <Grid container columnSpacing={2} rowSpacing={2.5}>
                <Grid item xs={12} sm={12} md={6} minHeight="100px">
                  <TextFieldFormik id="name" label={t("common:form.name")} name="name" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} minHeight="100px">
                  <TextFieldFormik id="surname" label={t("common:form.surname")} name="surname" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} minHeight="100px">
                  <TextFieldFormik id="email" label={t("common:form.email")} name="email" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} minHeight="100px">
                  <PasswordFieldFormik
                    id="password"
                    label={t("common:form.password")}
                    name="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} minHeight="100px">
                  <PasswordFieldFormik
                    id="confirm-password"
                    label={t("common:form.confirmPassword")}
                    name="confirmPassword"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} minHeight="100px">
                  <CheckboxFormik name="termsAndConditions" label={label} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                isSubmitting={registerFormik.isSubmitting}
                sx={{ marginY: "1rem" }}
              >
                {t("buttons:submit")}
              </Button>
            </form>
          </FormikProvider>
          <Typography marginY="0.5rem">
            {t("registerPage:accountInfo")}?
            <Link
              to="/login"
              style={{
                marginLeft: "0.5rem",
                color: "royalblue",
              }}
            >
              {t("registerPage:loginButton")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </BasePageLayout>
  );
};

export default Register;
