import { Box, IconButton, Typography, FormHelperText } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "components/Button/Button";
import React from "react";
import { useTranslation } from "react-i18next";
export interface FileInputValueProps {
  id: string;
  file: File;
}
export interface FileInputProps {
  /**
   * "id" has initial value. User is supposed to add "id" prop in case of using "FileInput" or "FileInputFormik" more than once.
   */
  id?: string;
  name: string;
  /**
   * @example
   * "images/*" input will specify image files for the user.
   * @example
   * "videos/*" input will specify viedo files for the user.
   * @example
   * ".doc,.docx" input will specify MS Word document files for the user.
   */
  accept?: string;
  /**
   *  If "true", allows user to add multiple files.
   */
  multiple?: boolean;
  /**
   * This prop let's you get your uploaded files.
   *
   * Notice! You don't need inputRef prop if you're using "FileInputFormik"
   * 
   * @example  handle adding multiple files with "inputRef"
   * 
   * const [attachedFiles, setAttachedFiles] = useState<FileInputValueProps[]>([]);
   * 
   * const handleChange = () => {
    if (!inputRef) return;
    const filesWithId = Array.from(inputRef.current?.files!).map((file) => ({
      id: uuidv4(),
      file,
    }));
    setAttachedFiles((prevState) => prevState.concat(filesWithId));
  };
   */
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  /**
   * Pass your onChange function here, to update the current state that will be passed to onSubmit function.
   * 
   * Notice! This prop is handled by "FileInputFormik" automatically
   * 
   * @example onChange handler function 
   * 
   * const [attachedFiles, setAttachedFiles] = useState<FileInputValueProps[]>([]);
   * 
   * const handleChange = () => {
    if (!inputRef) return;
    const filesWithId = Array.from(inputRef.current?.files!).map((file) => ({
      id: uuidv4(),
      file,
    }));
    setAttachedFiles((prevState) => prevState.concat(filesWithId));
  };
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: FileInputValueProps[];
  /**
   * @example remove files function
   * 
   * const [attachedFiles, setAttachedFiles] = useState<FileInputValueProps[]>([]);
   * 
   *   const removeFile = (id: string) => {
    setAttachedFiles(attachedFiles.filter((file) => file.id !== id));
  };
   */
  onRemoveFile: (fileId: string) => void;
  /**
   * Allows user to make a helper text.
   */
  helperText?: string;
  /**
   * Use "error" prop to make error text appear.
   *
   * "FileInputFormik" adds and handles this prop automatically.
   */
  error?: string;
  maxWidth?: string | number;
}
const FileInput = ({
  id = "file-input",
  name,
  accept = "image/*",
  multiple = false,
  onChange,
  inputRef,
  value,
  onRemoveFile,
  helperText,
  error,
  maxWidth = 400,
}: FileInputProps) => {
  const { t } = useTranslation("common");
  return (
    <Box maxWidth={maxWidth} minWidth={300} minHeight={180}>
      <Box
        boxShadow={8}
        sx={{
          backgroundColor: "action.hover",
          padding: "1rem",
          minHeight: "150px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          border: "3px dashed royalblue",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <input
            id={id}
            name={name}
            type="file"
            ref={inputRef}
            onChange={onChange ? onChange : undefined}
            multiple={multiple}
            accept={accept}
            style={{
              position: "relative",
              maxWidth: "200px",
              height: "46px",
              opacity: "0",
              textAlign: "right",
              zIndex: "2",
              cursor: "pointer",
            }}
          />
          <label htmlFor={id}>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                maxWidth: "200px",
                height: "100%",
                zIndex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "primary.light",
              }}
            >
              {t("fileInput.addFiles")}
            </Button>
          </label>
        </Box>
      </Box>
      {(helperText || error) && (
        <FormHelperText
          sx={{
            textAlign: "center",
            textTransform: "capitalize",
            fontSize: "1rem",
            color: error ? "error.main" : "text.primary",
          }}
        >
          {error ? error : helperText}
        </FormHelperText>
      )}
      {value &&
        value.map((file: FileInputValueProps) => {
          return (
            <Box
              key={file.id}
              boxShadow={3}
              mt={1}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "200px",
                height: "auto",
                padding: "0.5rem",
                backgroundColor: "primary.light",
                borderRadius: "0.25rem",
              }}
            >
              <Typography color="common.white">{file.file.name}</Typography>
              <IconButton onClick={() => onRemoveFile(file.id)}>
                <DeleteForeverIcon sx={{ color: "common.white" }} />
              </IconButton>
            </Box>
          );
        })}
    </Box>
  );
};

export default FileInput;
