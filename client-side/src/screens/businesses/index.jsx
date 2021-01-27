import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { CustomTable } from "../../components/components";
import { useActions } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// HEAD CELLS
const headCells = [
  { id: "title", label: "Logo" },
  { id: "title", label: "Name" },
  { id: "biography", label: "Description" },
  { id: "options", label: "Options" },
];

function isValueInField(value, list) {
  return list.toLowerCase().includes(value.toLowerCase());
}

const DistributionMakeListScreen = () => {
  const classes = useStyles();
  
  const { distributionMake } = useActions();
  const data = useSelector((state) => state.distributionMake);

  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  React.useEffect(() => {
    setTimeout(init, 500);
  }, []);
  const init = async () => {
    let { response } = await distributionMake();
    if (response) console.log(response);
  };
  // SET SEARCH: Set search field listner
  const applySearch = (row) => {
    if (searchValue !== "") {
      return isValueInField(searchValue, row.name);
    }
    return row;
  };
  const onSearchChange = (val) => {
    setSearchValue(val);
  };
  const history = useHistory();


  return (
    <div>
      <div className={classes.navWrapper}>
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
          placeholder="Search distribution"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("This functionality does not work at the moment")}
        >
          Upload Csv
        </Button>
      </div>
    </div>
  );
};
export default DistributionMakeListScreen;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#c9be9d",
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
