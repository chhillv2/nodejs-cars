import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const PageNav = (props, { children, btn, btnClick, ...otherProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.nav}>
      <Typography color="primary" variant="h1" align="left">
        {props.children}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onKeyPress={() => btnClick}
        onClick={() => btnClick}
      >
        {props.btn}
      </Button>
    </div>
  );
};

export default PageNav;

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
}));
