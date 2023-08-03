// client/App.js
import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (path) => {
    setLoading(true);
    axios
      .get(path)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally((err) => setLoading(false));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={() => fetchData("button_1")}>
          Button 1
        </Button>
        <Button variant="contained" onClick={() => fetchData("button_2")}>
          Button 2
        </Button>
        <Button variant="contained" onClick={() => fetchData("button_3")}>
          Button 3
        </Button>
      </Stack>

      <TableContainer component={Paper} className="tableContainer">
        <Table
          sx={{ minWidth: 650 }}
          lg={{ minWidth: 700 }}
          size="small"
          aria-label="simple table"
          className="tableContainer"
        >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Calories</TableCell>
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
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.Title}</TableCell>
                <TableCell align="right">{row.Year}</TableCell>
                <TableCell align="right">{row.imdbID}</TableCell>
                <TableCell align="right">
                  <img src={row.Poster} alt="{{Title}} Poster" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default App;
