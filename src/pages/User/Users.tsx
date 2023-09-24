import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar/Homebar";
import { getGames } from "../../config/API";
import { Games } from "../../interfaces/Games";
import GameTable from "../../components/GameTable/GameTable";
import Typography from "@mui/material/Typography";

const Users: React.FC = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <GameTable />
    </Box>
  );
};

export default Users;
