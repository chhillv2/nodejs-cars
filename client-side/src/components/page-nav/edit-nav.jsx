import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const EditNav = (props) => {
  const classes = useStyles();

  const { text, handleClick, handleCancel } = props;

  return (
    <div className={classes.nav}>
      <Typography color="primary" variant="h1" align="left">
        {text}
      </Typography>
      <div>
        <Button style={{ marginRight: 10 }} onClick={handleCancel}>
          Undo Changes
        </Button>

        <Button variant="contained" color="primary" onClick={handleClick}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditNav;

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingBottom: "1rem",
    marginBottom: "1rem",
    borderBottom: "1px solid #D8D8D8",
  },
}));
