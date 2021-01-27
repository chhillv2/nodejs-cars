import React, { useEffect, useState } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import { AlertComponent } from "../../../components";
import { useActions } from "../../../../redux/actions";

function AdvertRow(props) {
  const classes = useStyles();
  const [advertId, setAdvertId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  

  const { row } = props;
  const history = useHistory();
  const { AdvertDelete } = useActions();

  return (
    <TableRow key={row.advertId} className={classes.row}>
      <TableCell>
        <div className={classes.imageWrapper}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${row.source})` }}
          />
        </div>
      </TableCell>
      <TableCell>
        <Typography variant="h3" style={{ marginBottom: 5 }}>
          {row.advertId}
        </Typography>
      </TableCell>
      <TableCell align="right" style={{ width: 150 }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => {
            setAlertOpen(true);
          }}
        >
          <Delete />
        </IconButton>
        
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: "pointer",
  },
  imageWrapper: {
    width: "7rem",
    height: "7rem",
    backgroundColor: "#000",
    boxShadow: "2px 0px 8px rgba(0,0,0, .1)",
    borderRadius: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));

export default AdvertRow;
