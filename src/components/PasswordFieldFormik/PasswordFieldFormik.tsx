import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { TextFieldFormikProps } from "components/TextFieldFormik/TextFieldFormik";
import { useField } from "formik";
import { useState } from "react";
export interface PasswordFieldFormikProps extends Omit<TextFieldFormikProps, "type"> {
  /**
   * "id" has initial value. User is supposed to add "id" prop in case of using "PasswordFieldFormik" more than once.
   */
  id?: string;
  /**
   * Helps formik identify to which "useFormik" hook you refer to.
   *
   * Pass the same name as the name of a formik value you refer to.
   * 
   * @example 
   * 
   *   const updateUserInfoFormik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
    },
    onSubmit: (values) => {},
    validationSchema: updateUserValidation,
    *
    * <TextFieldFormik name="name" />
  });
   * 
   */
  name: string;
  variant?: "filled" | "outlined" | "standard";
  fullWidth?: boolean;
  helperText?: string;
}
const PasswordFieldFormik = ({
  id = "password-field",
  name,
  helperText,
  variant = "filled",
  fullWidth = true,
  ...TextFieldFormikProps
}: PasswordFieldFormikProps) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      id={id}
      name={name}
      value={field.value}
      type={showPassword ? "text" : "password"}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.error && meta.touched ? meta.error : helperText}
      onBlur={field.onBlur}
      variant={variant}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...TextFieldFormikProps}
    />
  );
};

export default PasswordFieldFormik;
