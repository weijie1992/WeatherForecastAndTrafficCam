import { useEffect } from "react";
import { Alert } from "@mui/material";

type ShowApiErrorSnack = {
  open: boolean;
  errorMessage: string;
};

type ShowApiErrorSnackComponent = {
  setShowApiErrorSnack: (
    updater: (prev: ShowApiErrorSnack | undefined) => ShowApiErrorSnack
  ) => void;
  showApiErrorSnack: ShowApiErrorSnack;
};

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
