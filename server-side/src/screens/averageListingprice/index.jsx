import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import { useActions } from "../../redux/actions";
import {
  PageNavComponent,
  UploadModal,
  ModalWrapper,
} from "../../components/components";
import { useHistory } from "react-router-dom";

import { CustomTable } from "../../components/components";

// HEAD CELLS
const headCells = [
  { id: "title", label: "Image" },
  { id: "title", label: "Description" },
  { id: "options", label: "Options" },
];



const AverageListingScreen = () => {
  const classes = useStyles();  

  const { averageListingprice } = useActions();

  React.useEffect(() => {
    setTimeout(init, 500);
  }, []);

  const init = async () => {
    let { response } = await averageListingprice();
    if (response) console.log(response);
  };

  return (
    <div>
      <div className={classes.navWrapper}>
        <b>The result can be seen in the server console.</b>
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("This functionality does not work at the moment")}
        >
          Upload Csv Here
        </Button>
      </div>
      
    </div>
  );
};
export default AverageListingScreen;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ff444b",
  },
  navWrapper: {
    marginBottom: "1rem",
    borderBottom: "1px solid #D8D8D8",
    paddingBottom: "1rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
}));
