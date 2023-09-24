import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar/Homebar";
import LevelCard from "../../components/Level/CardLevel/LevelCard";
import { ILevel } from "../../interfaces/Level";
import { getLevels } from "../../config/API";
import LevelForm from "../../components/Level/LevelForm/LevelForm";
import TaskForm from "../../components/Level/LevelForm/TaskForm";

interface DialogProps {
  open: boolean;
  onClose: (value: any) => void;
}

function DialogComp(props: DialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Level Form</DialogTitle>
      <LevelForm
        isUpdate={false}
        name={""}
        maxScore={0}
        time={0}
        description=""
        _id={""}
      />
    </Dialog>
  );
}



const Level: React.FC = () => {
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLevel() {
      setIsLoading(true);

      const response = await getLevels();

      if (response) {
        setLevels(response.data);
        setIsLoading(false);
      }
    }
    fetchLevel();
  }, []);

  if (levels == undefined || isLoading) {
    return <Typography>Levels are loading..</Typography>;
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <ResponsiveAppBar />
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <Box
          display={"flex"}
          alignContent={"center"}
          my={2}
          justifyContent={"space-between"}
        >
          <h1>Level Catelog</h1>
          <Button
            variant={"contained"}
            sx={{
              mx: 2,
            }}
            onClick={handleClickOpen}
          >
            Create Level
          </Button>
        </Box>
        <Stack spacing={2} direction={"row"} useFlexGap flexWrap={"wrap"}>
          {levels?.map((item, idx) => (
            <LevelCard
              key={idx}
              _id={item._id}
              name={item.name}
              task={item.task}
              description={item.description}
              maxScore={item.maxScore}
              levelNumber={item.levelNumber}
              time={item.time}
            />
          ))}
        </Stack>
      </Box>
      <DialogComp open={open} onClose={handleClickClose} />
    </Box>
  );
};

export default Level;
