import DashboardLayoutWrapper from "wrappers/DashboardLayoutWrapper";
import { BreadcrumbsProps } from "layouts/Dashboard/components/Breadcrumbs/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Card, CardContent, Grid } from "@mui/material";
import Button from "components/Button/Button";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import FileInputFormik from "components/FileInputFormik/FileInputFormik";
import { useYupTranslation } from "common/useYupTranslation";
import TextFieldFormik from "components/TextFieldFormik/TextFieldFormik";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FileInputProps } from "components/FileInput/FileInput";
import PasswordFieldFormik from "components/PasswordFieldFormik/PasswordFieldFormik";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "store/hooks";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import {
  deleteAccount,
  deleteUserAvatar,
  updateUserAvatar,
  updateUserData,
  updateUserPassword,
} from "../userSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "features/auth/authSlice";
import Modal from "components/Modal/Modal";
import useDocumentTitle from "common/useDocumentTitle";

const breadcrumbs: BreadcrumbsProps[] = [
  {
    label: "dashboard",
    to: "start",
  },
  {
    label: "accountManagement",
  },
];

const AccountManagement = () => {
  useYupTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["translation", "common", "buttons", "modal"]);

  useDocumentTitle(t("translation:accountManagementPage.heading"));

  const { name, surname, email, avatar } = useAppSelector((state) => state.user);

  const deleteUserAndRedirect = async () => {
    await deleteAccount();
    await logoutUser();
    navigate("/login");
  };

  const uploadAvatarValidation = Yup.object({
    avatar: Yup.array()
      .of(Yup.object())
      .min(1, `${t("common:fileInput.maxFilesError")} 1`)
      .required()
      .nullable(),
  });

  const updateUserValidation = Yup.object({
    name: Yup.string().required(),
    surname: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  const changePasswordValidation = Yup.object({
    password: Yup.string().required().min(8, t("common:form.passwordMinError")),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], t("common:form.passwordMatchError")),
  });

  const uploadAvatarFormik = useFormik({
    initialValues: {
      avatar: [] as FileInputProps["value"],
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      values.avatar.forEach((file) => {
        formData.append("file", file.file);
      });

      await dispatch(updateUserAvatar(formData));
      resetForm();
    },
    validationSchema: uploadAvatarValidation,
  });

  const updateUserInfoFormik = useFormik({
    initialValues: {
      name: name || "",
      surname: surname || "",
      email: email || "",
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateUserData(values));
      resetForm();
    },
    validationSchema: updateUserValidation,
  });
  const changePasswordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      updateUserPassword({ ...values, repeatedPassword: values.confirmPassword });
      resetForm();
    },
    validationSchema: changePasswordValidation,
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
        {t("translation:accountManagementPage.heading")}
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
        <Box m={2} sx={{ display: "grid", placeItems: "center" }}>
          <Avatar
            alt={`${name} ${surname}`}
            src={avatar}
            sx={{
              width: "100px",
              height: "100px",
              border: "3px solid royalblue",
              boxShadow: "0 4px 8px black",
            }}
          />
          <Typography variant="h4" mt={2}>{`${name} ${surname}`}</Typography>
          <Button
            startIcon={<DeleteIcon />}
            sx={{ marginTop: "0.5rem", backgroundColor: "action.active" }}
            onClick={() => dispatch(deleteUserAvatar())}
          >
            {t("buttons:remove")}
          </Button>
        </Box>
        <Card sx={{ width: "100%" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              textAlign={"left"}
              sx={{ textTransform: "capitalize" }}
            >
              {t("translation:accountManagementPage.changeAvatar")}
            </Typography>
            <FormikProvider value={uploadAvatarFormik}>
              <form onSubmit={uploadAvatarFormik.handleSubmit}>
                <FileInputFormik
                  id="avatar-input"
                  name="avatar"
                  helperText={t("translation:accountManagementPage.uploadAvatarHelperText")}
                  accept="image/*"
                />

                {/* {uploadAvatarFormik.values.avatar.length !== 0 && ( */}
                <Button
                  type="submit"
                  isSubmitting={uploadAvatarFormik.isSubmitting}
                  startIcon={<FileUploadIcon />}
                  sx={{ marginTop: "1rem" }}
                >
                  {t("common:fileInput.sendFiles")}
                </Button>
                {/* // )} */}
              </form>
            </FormikProvider>
            <Typography
              component="h2"
              variant="h5"
              textAlign={"left"}
              sx={{ textTransform: "capitalize" }}
            >
              {t("translation:accountManagementPage.userInfo")}
            </Typography>
            <FormikProvider value={updateUserInfoFormik}>
              <form onSubmit={updateUserInfoFormik.handleSubmit}>
                <Grid
                  container
                  columnSpacing={2}
                  rowSpacing={1.5}
                  sx={{
                    display: "flex",
                    marginBottom: "1rem",
                  }}
                >
                  <Grid item xs={12} sm={6} md={4} minHeight="100px">
                    <TextFieldFormik id="name" label={t("common:form.name")} name="name" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} minHeight="100px">
                    <TextFieldFormik id="surname" label={t("common:form.surname")} name="surname" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} minHeight="100px">
                    <TextFieldFormik id="email" label={t("common:form.email")} name="email" />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  startIcon={<TaskAltIcon />}
                  isSubmitting={updateUserInfoFormik.isSubmitting}
                >
                  {t("common:form.submitButton")}
                </Button>
              </form>
            </FormikProvider>
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              textAlign={"left"}
              sx={{ textTransform: "capitalize" }}
            >
              {t("accountManagementPage.changePass")}
            </Typography>
            <FormikProvider value={changePasswordFormik}>
              <form onSubmit={changePasswordFormik.handleSubmit}>
                <Grid
                  container
                  columnSpacing={2}
                  rowSpacing={1.5}
                  sx={{
                    display: "flex",
                    marginBottom: "1rem",
                  }}
                >
                  <Grid item xs={12} sm={6} md={4} minHeight="100px">
                    <PasswordFieldFormik
                      id="password"
                      label={t("common:form.password")}
                      name="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} minHeight="100px">
                    <PasswordFieldFormik
                      id="confirm-password"
                      label={t("common:form.confirmPassword")}
                      name="confirmPassword"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  startIcon={<TaskAltIcon />}
                  isSubmitting={changePasswordFormik.isSubmitting}
                >
                  {t("common:form.submitButton")}
                </Button>
              </form>
            </FormikProvider>
            <Modal
              title={t("modal:deleteAccount.title")}
              text={t("modal:deleteAccount.text")}
              openModalBtnText={t("modal:deleteAccount.openModalButton")}
              openModalBtnColor="error"
              onAsyncClick={() => deleteUserAndRedirect()}
              openModalBtnVariant="text"
              openModalBtnFullWidth={true}
              acceptBtnVariant="text"
              acceptBtnColor="error"
              rejectBtnVariant="contained"
            />
          </CardContent>
        </Card>
      </Box>
    </DashboardLayoutWrapper>
  );
};

export default AccountManagement;
