import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";

import { useActions } from "../../redux/actions";

const TopfivepermonthScreen = () => {
  const { topfivepermonth } = useActions();
  const classes = useStyles();

  console.log("successfully");
  

  const init = async () => {
    let { response } = await topfivepermonth();
    if (response) console.log(response);
  };

  return (
    <div>
      <div className={classes.navWrapper}>
      
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Upload CSV here: This functionality does not work at the moment.")}
        >
          Upload Csv here
        </Button>
      </div>
     
    </div>
  );
};
export default TopfivepermonthScreen;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ff444b",
  },
  navWrapper: {
    marginBottom: "1rem",
    borderBottom: "1px solid #D8D8D8",
    paddingBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
}));
