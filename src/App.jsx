// client/App.js
import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DataTable from "./components/DataTable";
import CircularProgress from "@mui/material/CircularProgress";

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
          paddingBottom: "20px",
          paddingTop: "20px",
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
      <DataTable data={data} />
    </>
  );
};

export default App;
