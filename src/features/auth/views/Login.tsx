import BasePageLayout from "layouts/BasePageLayout/BasePageLayout";
import { ReactComponent as Logo } from "images/logo.svg";
import { Box, Grid, Typography } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import TextFieldFormik from "components/TextFieldFormik/TextFieldFormik";
import PasswordFieldFormik from "components/PasswordFieldFormik/PasswordFieldFormik";
import Button from "components/Button/Button";
import * as Yup from "yup";
import LoginImg from "images/login.svg";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from "utils/localStorage/localStorage";
import { loginUser } from "../authSlice";
import { useYupTranslation } from "common/useYupTranslation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "routes/PrivateRoute";
import useDocumentTitle from "common/useDocumentTitle";
const Login = () => {
  useYupTranslation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common", "loginPage", "buttons", "loginPage"]);
  useDocumentTitle(t("loginPage:header"));
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  const currentTime = new Date().getTime();
  const decodedAccessToken = decodeToken<DecodedToken["accessToken"]>(token!);
  const decodedRefreshToken = decodeToken<DecodedToken["refreshToken"]>(refreshToken!);
  useEffect(() => {
    if (location.search === "?token-expired") {
      toast.error(t("loginPage:logoutNotification"), {
        autoClose: false,
      });
    }
  }, [location, t, token]);

  const loginValidation = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await dispatch(loginUser(values));
      navigate(`${location.state ? location.state : "/start"}`);
    },
    validationSchema: loginValidation,
  });
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
            src={LoginImg}
            alt="a man trying to open the door ilustration"
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
            {t("loginPage:header")}
          </Typography>
          <FormikProvider value={loginFormik}>
            <form onSubmit={loginFormik.handleSubmit} style={{ maxWidth: "520px" }}>
              <Grid container columnSpacing={2} rowSpacing={2.5}>
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
              </Grid>
              <Button
                type="submit"
                isSubmitting={loginFormik.isSubmitting}
                sx={{ marginY: "1rem" }}
              >
                {t("buttons:submit")}
              </Button>
            </form>
          </FormikProvider>
          <Typography marginY="0.5rem">
            {t("loginPage:accountInfo")}?
            <Link
              to="/register"
              style={{
                marginLeft: "0.5rem",
                color: "royalblue",
              }}
            >
              {t("loginPage:registerButton")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </BasePageLayout>
  );
};

export default Login;
