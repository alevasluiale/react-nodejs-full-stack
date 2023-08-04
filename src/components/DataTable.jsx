import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";

const DataTable = ({ data }) => {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = data.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <Table
      sx={{ minWidth: 500, width: "500px", margin: "auto" }}
      size="small"
      aria-label="simple table"
    >
      <TableHead>
        <TableRow>
          <TableCell align="right">
            <TableSortLabel
              active={orderBy === "Title"}
              direction={orderBy === "Title" ? order : "asc"}
              onClick={() => handleSort("Title")}
            >
              Title
            </TableSortLabel>
          </TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={orderBy === "Year"}
              direction={orderBy === "Year" ? order : "asc"}
              onClick={() => handleSort("Year")}
            >
              Year
            </TableSortLabel>
          </TableCell>

          <TableCell align="right">
            <TableSortLabel
              active={orderBy === "imdbID"}
              direction={orderBy === "imdbID" ? order : "asc"}
              onClick={() => handleSort("imdbID")}
            >
              Imdb ID
            </TableSortLabel>
          </TableCell>

          <TableCell align="right">Poster </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.imdbID}>
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
  );
};

export default DataTable;
