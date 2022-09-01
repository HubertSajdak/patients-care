import { v4 as uuidv4 } from "uuid";
import { useField } from "formik";
import FileInput, { FileInputProps, FileInputValueProps } from "components/FileInput/FileInput";

export interface FileInputFormikProps
  extends Omit<FileInputProps, "onRemoveFile" | "value" | "onChange" | "error"> {
  /**
   * Name helps formik identify to which "useFormik" hook you refer to.
   * 
   * Pass the same name as the name of a formik value you refer to.
   * 
   * @example 
   * 
   *   const uploadAvatarFormik = useFormik({
    initialValues: {
      avatar: [] as FileInputProps["value"],
    },
    onSubmit: (values) => {},
    validationSchema: uploadAvatarValidation,
  });
   *
   *<FileInputFormik
    id="avatar-input"
    name="avatar"
    accept="image/*"
    />
   */
  name: string;
}
const FileInputFormik = ({ name, ...FileInputProps }: FileInputFormikProps) => {
  const [field, meta, helpers] = useField<FileInputValueProps[]>(name);

  const handleChange = ({ currentTarget: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    if (FileInputProps.multiple) {
      const filesWithId = Array.from(files).map((file) => ({ id: uuidv4(), file }));
      helpers.setValue(field.value.concat(filesWithId));
    } else {
      helpers.setValue([files[0]].map((file) => ({ id: uuidv4(), file })));
    }
  };

  const removeFile = (id: string) => {
    helpers.setValue(field.value.filter((file) => file.id !== id));
  };

  return (
    <>
      <FileInput
        id={FileInputProps.id}
        name={name}
        onChange={handleChange}
        onRemoveFile={removeFile}
        value={field.value}
        error={meta.error && meta.touched ? meta.error : undefined}
        {...FileInputProps}
      />
    </>
  );
};

export default FileInputFormik;
