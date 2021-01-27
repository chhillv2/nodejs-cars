import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Toolbar,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const PageNav = (props) => {
  const classes = useStyles();
  const {
    title,
    handleButton,
    btnText,
    hideButton,
    search,
    searchValue,
    onSearchChange,
    searchPlaceholder,
  } = props;

  return (
    <div className={classes.root}>
      {search ? (
        <div>
          <TextField
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>
      ) : (
        <div>
          <Typography variant="h1">{title}</Typography>
        </div>
      )}
      <div>
        {!hideButton ? (
          <Button
            variant="contained"
            color="primary"
            onKeyPress={handleButton}
            onClick={handleButton}
          >
            {btnText}
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PageNav;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 0",
  },
}));
