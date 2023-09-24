import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ILevel } from "../../../interfaces/Level";
import LevelForm from "../LevelForm/LevelForm";
import { deleteLevelDetails, getLevelDetails } from "../../../config/API";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskForm from "../LevelForm/TaskForm";

interface DialogProps {
  open: boolean;
  data: ILevel;
  onClose: (value: any) => void;
}

function DialogComp(props: DialogProps) {
  const { open, onClose, data } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Level Form</DialogTitle>
      <LevelForm
        _id={data._id}
        name={data.name}
        maxScore={data.maxScore}
        time={data.time}
        description={data.description}
        isUpdate={true}
      />
    </Dialog>
  );
}

interface TaskDialogProps {
  open: boolean;
  onClose: (value: any) => void;
  levelData: Object;
}

function CreateTaskDialog(props: TaskDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>Create Task</DialogTitle>
      <TaskForm />
    </Dialog>
  );
}

const LevelCard: React.FC<ILevel> = ({
  _id,
  name,
  task,
  description,
  maxScore,
  time,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [taskOpen, setTaskOpen] = useState<boolean>(false);
  const [sLevel, setSLevel] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  async function fetchLevel(id: string) {
    if (id != "") {
      const response = await getLevelDetails(id);

      if (response) {
        // setSLevel(response);
        console.log(response);
      }
    }
  }

  async function deleteLevel(id: string) {
    if (id != "") {
      const response = await deleteLevelDetails(id);

      if (response) {
        window.location.reload();
      }
    }
  }

  return (
    <>
      <Card
        sx={{
          width: "30%",
          border: '1px solid #D4D4D4',
          ["@media (max-width:780px)"]: {
            width: "100%",
          },
        }}
      >
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"} py={1}>
            <Typography variant="h5">{name}</Typography>
            <Stack direction={"row"} spacing={2}>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  fetchLevel(_id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteLevel(_id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
          <Typography>{description}</Typography>
          <Stack direction={"row"} spacing={2} my={1}>
            <Chip label={`MaxScore: ${maxScore}`} color={"primary"} />
            <Chip label={`${time} min`} color={"success"} />
            <Chip label={`${task.length} Tasks`} color={"error"} />
          </Stack>
          <Stack direction={"row"} spacing={3} mt={3}>
            <Button
              variant="outlined"
              onClick={() => {
                setTaskOpen(true);
                fetchLevel(_id);
              }}
            >
              Create Task
            </Button>
            <Button variant="outlined">View Tasks</Button>
          </Stack>
        </CardContent>
      </Card>
      <DialogComp
        open={open}
        onClose={handleClose}
        data={{ name, description, maxScore, time, _id, task, levelNumber: 0 }}
      />
      <CreateTaskDialog open={taskOpen} onClose={() => setTaskOpen(false)} />
    </>
  );
};

export default LevelCard;
