import Checkbox from "components/Checkbox/Checkbox";
import { useField } from "formik";
import { CheckboxProps } from "components/Checkbox/Checkbox";
export type CheckboxFormikProps = {
  /**
   * Add this prop if there is more than one "CheckboxFormik" component
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
  label: React.ReactNode;
} & Omit<CheckboxProps, "id" | "checked" | "onChange" | "label" | "error">;
const CheckboxFormik = ({
  id = "checkbox-formik",
  name,
  label,
  ...CheckboxFormikProps
}: CheckboxFormikProps) => {
  const [field, meta] = useField(name);
  return (
    <Checkbox
      id={id}
      name={name}
      checked={field.value}
      onChange={field.onChange}
      label={label}
      error={meta.error && meta.touched ? meta.error : undefined}
      {...CheckboxFormikProps}
    />
  );
};

export default CheckboxFormik;
