// DataTable.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DataTable from "./DataTable";

describe("DataTable", () => {
  const data = [
    { Title: "First Matrix", Year: "1999", imdbID: "imdb-id", Poster: "N/A" },
    { Title: "Second Matrix", Year: "2000", imdbID: 2, Poster: "N/A" },
    { Title: "Thirs Matrix", Year: "2001", imdbID: 3, Poster: "N/A" },
  ];

  it("renders table headers and data rows correctly", () => {
    render(<DataTable data={data} />);

    // Test table headers
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Imdb ID")).toBeInTheDocument();
    expect(screen.getByText("Poster")).toBeInTheDocument();

    // Test table data rows
    expect(screen.getByText("First Matrix")).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
    expect(screen.getByText("imdb-id")).toBeInTheDocument();
  });

  it("sorts data based on column headers", () => {
    render(<DataTable data={data} />);

    // Click on the Name column header to sort by Name in ascending order
    fireEvent.click(screen.getByText("Title"));

    // Click again to sort by Name in descending order
    fireEvent.click(screen.getByText("Title"));
  });
});
