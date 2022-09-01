import * as Yup from "yup";

import { useTranslation } from "react-i18next";

export const useYupTranslation = () => {
  const { t } = useTranslation(["common"]);
  Yup.setLocale({
    mixed: {
      required: t("common:form.requiredFieldError"),
      oneOf: t("common:form.passwordMatchError"),
    },
    string: {
      email: t("common:form.emailError"),
      min: ({ min }) => `${t("common:form.minCharError")} ${min}`,
      max: ({ max }) => `${t("common:form.maxCharError")} ${max}`,
    },
    number: {
      min: ({ min }) => `${t("common:form.minCharError")} ${min}`,
      max: ({ max }) => `${t("common:form.maxCharError")} ${max}`,
    },
  });

  return Yup;
};
