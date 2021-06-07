import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { useState } from "react";

export const VerificationStatusBanner = ({ isVerified }) => {
  const [open, setOpen] = useState(!isVerified);

  const handleClose = (_, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning">
        Please verify your account
      </Alert>
    </Snackbar>
  );
};
