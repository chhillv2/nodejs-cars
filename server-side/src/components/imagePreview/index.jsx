import React from "react";
import { makeStyles } from "@material-ui/core";

const ImagePreview = (props) => {
  const classes = useStyles();
  const { image } = props;

  return (
    <div className={classes.root}>
      <div className={classes.imageWrapper}>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    backgroundColor: "#000",
    boxShadow: "2px 0px 8px rgba(0,0,0, .1)",
    borderRadius: "5px 5px 5px 5px",
    overflow: "hidden",
  },
  imageWrapper: {
    display: "block",
    width: "100%",
    height: "16rem",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
