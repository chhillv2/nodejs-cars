import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Typography } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ModalWrapper = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const { title, open, handleClose, modalBody } = props;

  return (
    <div style={{ zIndex: 20000 }}>
      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        disableAutoFocus={true}
        className={classes.modal}
      >
        <div style={modalStyle} className={classes.root}>
          <div className={classes.header}>
            <Typography color="primary" variant="h1" align="left">
              {title}
            </Typography>

            <Typography
              onClick={handleClose}
              variant="h3"
              align="right"
              style={{ cursor: "pointer" }}
            >
              Cancel
            </Typography>
          </div>

          <div className={classes.body}>{modalBody}</div>
        </div>
      </Modal>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    minWidth: 1000,
    height: 700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "0px 0px 6px rgba(0,0,0, .2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2rem 1.2rem",
    borderBottom: "1px solid #D8D8D8",
  },
  body: {
    height: "100%",
    width: "100%",
    flexGrow: 1,
    marginBottom: 70,
    zIndex: 50000,
  },
}));

export default ModalWrapper;
