import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

export type TextFieldFormikProps = {
  /**
   * "id" has initial value. User is supposed to add "id" prop in case of using "TextFieldFormik" more than once.
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
} & Omit<TextFieldProps, "error" | "onBlur" | "helperText" | "onChange" | "value" | "variant">;

const TextFieldFormik = ({
  id = "text-field",
  variant = "filled",
  name,
  fullWidth = true,
  helperText,
  ...TextFieldProps
}: TextFieldFormikProps) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      id={id}
      name={name}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.error && meta.touched ? meta.error : helperText}
      onBlur={field.onBlur}
      variant={variant}
      fullWidth={fullWidth}
      {...TextFieldProps}
    />
  );
};

export default TextFieldFormik;
