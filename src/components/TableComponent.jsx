import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TableComponent({ data }) {
  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table
        sx={{ minWidth: 500, width: "500px", margin: "auto" }}
        size="small"
        aria-label="simple table"
        className="tableContainer"
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Imdb ID</TableCell>
            <TableCell align="right">Poster</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.Title}</TableCell>
              <TableCell align="right">{row.Year}</TableCell>
              <TableCell align="right">{row.imdbID}</TableCell>
              <TableCell align="right">
                {row.Poster !== "N/A" ? <img src={row.Poster} alt="" /> : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
