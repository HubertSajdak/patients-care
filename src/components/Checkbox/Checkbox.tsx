import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormControlLabelProps as MuiFormControlLabelProps,
  FormHelperText,
} from "@mui/material";
export type CheckboxTypesCombined = Omit<
  MuiCheckboxProps,
  "id" | "checked" | "onChange" | "error"
> &
  Omit<MuiFormControlLabelProps, "control" | "checked" | "onChange" | "label" | "disabled">;
export interface CheckboxProps extends CheckboxTypesCombined {
  /**
   * Add this prop if there is more than one "Checkbox" component.
   */
  id?: string;
  label: React.ReactNode;
  /**
   * Pass a boolean value (f.e. from useState) to determine if checkbox component is checked.
   */
  checked: boolean;
  /**
   * Pass the function that will change the checked state.
   */
  onChange: (event: React.SyntheticEvent<Element, Event>, checked: boolean) => void;
  /**
   * Allows user to make a helper text.
   */
  helperText?: string;
  /**
   * Use "error" prop to make error text appear.
   *
   * "CheckboxFormik" adds and handles this prop automatically.
   */
  error?: string;
}

const Checkbox = ({
  id = "checkbox",
  label,
  checked,
  onChange,
  helperText,
  error,
  ...CheckboxProps
}: CheckboxProps) => {
  return (
    <>
      <FormControlLabel
        id={id}
        onChange={onChange}
        control={<MuiCheckbox id={id} checked={checked} {...CheckboxProps} />}
        label={label}
        {...CheckboxProps}
      />
      {(helperText || error) && (
        <FormHelperText
          sx={{
            textTransform: "capitalize",
            color: error ? "error.main" : "text.primary",
            margin: "3px 14px 0",
          }}
        >
          {error ? error : helperText}
        </FormHelperText>
      )}
    </>
  );
};

export default Checkbox;
