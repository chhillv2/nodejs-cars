import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DropzoneArea } from "material-ui-dropzone";

const UploadDialog = (props, ref) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [file, setFile] = React.useState();

  React.useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
      setFile();
    },
  }));

  const handleUpload = (files) => {
    setFile(files[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.root}>
          <DropzoneArea
            dropzoneText="&nbsp;&nbsp;&nbsp;Drag your file here&nbsp;&nbsp;&nbsp;"
            filesLimit={1}
            maxFileSize={60000000}
            showPreviewsInDropzone={false}
            onChange={handleUpload}
            className={classes.dropzone}
          />
        </DialogContent>
        <div className={classes.spacer} />
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(2),
  },
  root: {
    width: "30rem",
  },
  spacer: {
    height: theme.spacing(2),
  },
}));

export default React.forwardRef(UploadDialog);
