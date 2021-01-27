import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import {
  ArticleRow,
  AuthorRow,
  BusinessRow,
  AdvertRow,
} from "./tableRow/index";

// ORDER TABLE FUNCTION
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// STABLE SORTING FUNCTION
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// STABLE SORTING FUNCTION
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

// VIDEO TABLE
const CustomTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);

  const {
    headCells,
    tableDate,
    defualtOrder,
    applySearch,
    tableType,
    rowsPerPage,
    setRowsPerPage,
  } = props;

  // Set Page EFFECT
  useEffect(() => {
    setPage(0);
    setOrderBy(defualtOrder);
  }, [defualtOrder]);

  // Handle Page Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort Handeler
  const createSortHandler = (headCellId) => () => {
    if (orderBy === headCellId) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(headCellId);
      setOrder("asc");
    }
  };

  const renderRow = (row) => {
    if (tableType === "author") return <AuthorRow row={row} />;
    if (tableType === "business") return <BusinessRow row={row} />;
    if (tableType === "advert") return <AdvertRow row={row} />;
    if (tableType === "article") return <ArticleRow row={row} />;

    return <ArticleRow row={row} />;
  };

  const rows = stableSort(tableDate, getSorting(order, orderBy)).filter(
    applySearch
  );

  return (
    <div>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  align={headCell.align}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => renderRow(row))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default CustomTable;
