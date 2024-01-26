import { useEffect } from "react";
import { Alert } from "@mui/material";
import { ShowApiErrorSnackComponent } from "../utils/types";

const CustomAlert = ({
  setShowApiErrorSnack,
  showApiErrorSnack,
}: ShowApiErrorSnackComponent) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowApiErrorSnack((prev) => ({
        ...prev,
        open: false,
        errorMessage: "",
      }));
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [showApiErrorSnack.open, setShowApiErrorSnack]);

  return (
    <>
      {showApiErrorSnack.open && (
        <Alert severity="error">{showApiErrorSnack.errorMessage}</Alert>
      )}
    </>
  );
};

export default CustomAlert;
