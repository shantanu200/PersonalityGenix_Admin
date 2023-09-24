import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Games } from "../../interfaces/Games";
import { getGames } from "../../config/API";
import "./GameTable.css";
import { Box, Button, CircularProgress } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${String(params.row._id).substring(0, 6)}`,
  },
  {
    field: "FirstName",
    headerClassName: "header",
    headerName: "FirstName",
    headerAlign: "center",
    align: "center",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.firstPlayer?.name}`,
  },
  {
    field: "SecondPlayerName",
    headerName: "SecondName",
    headerAlign: "center",
    align: "center",
    headerClassName: "header",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.secondPlayer?.name}`,
  },
  {
    field: "FirstPlayerBid",
    headerName: "FirstPlayerBid",
    headerAlign: "center",
    align: "center",
    headerClassName: "header",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `₹. ${params.row.firstPlayer?.bid}`,
  },
  {
    field: "SecondPlayerBid",
    headerName: "SecondPlayerBid",
    headerAlign: "center",
    align: "center",
    headerClassName: "header",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `₹. ${params.row.secondPlayer?.bid}`,
  },
  {
    field: "Winner",
    headerName: "Winner",
    headerAlign: "center",
    align: "center",
    headerClassName: "header",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row?.isGameCompleted ? params.row?.winner : "Not Over"}`,
  },
  {
    field: "totalBid",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    headerName: "TotalWinningBid",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `₹. ${
        parseInt(params.row.firstPlayer?.bid) +
        parseInt(params.row.secondPlayer?.bid)
      }`,
  },
  {
    field: "PlayedAt",
    headerName: "PlayedAt",
    headerAlign: "center",
    headerClassName: "header",
    align: "center",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${new Date(params.row.createdAt).toLocaleString()}`,
  },
  {
    field: "Status",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <Button
          variant="outlined"
          sx={
            params.row?.isGameCompleted
              ? {
                  borderColor: "sky-blue",
                  "&:hover": {
                    background: "blue",
                    color: "#fff",
                    borderColor: "sky-blue",
                  },
                }
              : {
                  borderColor: "red",
                  color: "red",
                  "&:hover": {
                    background: "red",
                    color: "#fff",
                    borderColor: "red",
                  },
                }
          }
        >
          {params.row?.isGameCompleted ? "Active" : "Inactive"}
        </Button>
      );
    },
  },
  {
    field: "Details",
    headerClassName: "header",
    headerAlign: "center",
    align: "center",
    headerName: "Details",
    width: 150,
    renderCell: (params) => {
      return <Button variant="outlined">Details</Button>;
    },
  },
];

const GameTable: React.FC = () => {
  const [games, setGames] = useState<Games[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(100);

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      const response = await getGames(page, limit);

      if (response) {
        console.log(response);
        setGames(response.data);
        setIsLoading(false);
      }
    }
    fetchGames();
  }, [page, limit]);

  if (games === undefined) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: "1rem" }}>
      <DataGrid
        rows={games}
        columns={columns}
        getRowId={(row) => String(row._id)}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8 },
          },
        }}
      />
    </Box>
  );
};

export default GameTable;
