import React, { useEffect, useState } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { AlertComponent } from "../../../components";
import { useActions } from "../../../../redux/actions";

function AuthorRow(props) {
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = useState(false);
  const [authorId, setAuthorId] = useState(null);

  const { row } = props;

  const history = useHistory();
  const { BusinessDelete } = useActions();

  useEffect(() => {
    setAuthorId(row.profileId);
  }, [row]);

  // HANDLE ROW CLICK
  const onRowClick = (id) => {
    history.push(`businesses/${id}`);
    //alert(id);
  };

  // HANDLE DELETE
  const handleDelete = async (id) => {
    let { error } = await BusinessDelete(id);
    if (error) console.log(error.response ? error.response.data : error);
    console.log("Sone");
    setAlertOpen(false);
  };

  return (
    <TableRow key={row.profileId} className={classes.row}>
      <TableCell>
        <div
          className={classes.profilePhoto}
          style={{
            backgroundImage: `url(${row.picture})`,
          }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="h3">{row.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle1">
          {row.biography?.substring(0, 50)}...
        </Typography>
      </TableCell>
      <TableCell align="right" style={{ width: 150 }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => onRowClick(row.profileId)}
        >
          <Edit />
        </IconButton>
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
        <AlertComponent
          open={alertOpen}
          handleClose={() => setAlertOpen(false)}
          handleAction={() => handleDelete(row.profileId)}
          title="Delete item?"
          message="Are you sure you want to delete this item? This process cannot be undone."
          actionText="Yes, delete"
          closeText="No, cancel"
        />
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: "pointer",
  },
  profilePhoto: {
    width: "2.5rem",
    height: "2.5rem",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: 2000,
    boxShadow: "2px 0px 8px rgba(0,0,0, .1)",
  },
}));

export default AuthorRow;
