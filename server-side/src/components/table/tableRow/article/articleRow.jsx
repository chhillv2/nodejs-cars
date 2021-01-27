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

function ArticleRow(props) {
  const classes = useStyles();
  const [articleId, setArticleId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const { row } = props;
  const history = useHistory();
  const { ArticleDelete } = useActions();

  useEffect(() => {
    setArticleId(row.articleId);
  }, [row]);

  // HANDLE ROW CLICK
  const onRowClick = (id) => {
    history.push(`articles/${id}`);
  };

  // HANDLE DELETE
  const handleDelete = async (id) => {
    let { error } = await ArticleDelete(id);
    if (error) console.log(error.response ? error.response.data : error);
    setAlertOpen(false);
  };

  return (
    <TableRow key={row.articleId} className={classes.row}>
      <TableCell>
        <div className={classes.imageWrapper}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${row.picture})` }}
          />
        </div>
      </TableCell>
      <TableCell>
        <Typography variant="h3" style={{ marginBottom: 5 }}>
          {row.title}
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: 5 }}>
          {row.text?.substring(0, 60)}...
        </Typography>
      </TableCell>
      <TableCell align="right" style={{ width: 150 }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => onRowClick(row.articleId)}
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
          handleAction={() => handleDelete(row.articleId)}
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
  imageWrapper: {
    width: "3rem",
    height: "3rem",
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

export default ArticleRow;
