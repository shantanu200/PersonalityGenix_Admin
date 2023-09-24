import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTask, getLevels } from "../../../config/API";
import { ILevel } from "../../../interfaces/Level";

interface TaskData {
  levelID: string;
  title: string;
  score: number;
}

const TaskForm: React.FC = () => {
  const [level, setLevel] = useState<ILevel[]>([]);
  const [formData, setFormData] = useState<TaskData>({
    levelID: "",
    title: "",
    score: 0,
  });
  const [jsonData, setJsonData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLevel() {
      const response = await getLevels();

      if (response) {
        setLevel(response?.data);
      }
    }
    fetchLevel();
  }, []);

  const handleSubmit = async () => {
    console.log(formData);

    if (!formData.levelID) {
      alert("❌ Please select level name.");
      return;
    }

    if (!formData.title || !formData.score) {
      alert("❌ Please fill all form details");
      return;
    }

    try {
      const response = await createTask(formData);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type === "application/json") {
      const file = e.target.files[0];
      try {
        const fileContent = await file.text();

        if (fileContent) {
          const parseData = JSON.parse(fileContent);
          console.log(parseData);
          setJsonData(parseData);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box p={2}>
      <Stack spacing={2} component={"form"}>
        <FormControl fullWidth>
          <InputLabel>Level</InputLabel>
          <Select
            onChange={(e: SelectChangeEvent) =>
              setFormData({ ...formData, levelID: e.target.value })
            }
          >
            {level.map((val, idx) => (
              <MenuItem key={idx} value={val._id}>
                {val.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <TextField
          label="Score"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, score: parseInt(e.target.value) })
          }
        />
      </Stack>
      <Stack spacing={2} mt={4}>
        <Chip variant="outlined" label="OR" color="primary" />
        <Stack>
          <Typography variant={"caption"}>Uplod JSON File of Tasks</Typography>
          <TextField type="file" onChange={handleFile} fullWidth />
        </Stack>
      </Stack>
      {jsonData.length > 0 && (
        <Box my={2} bgcolor={"#333"} color={"#fff"} p={2}>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </Box>
      )}
      <Button
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        variant="contained"
        color={"success"}
        fullWidth
      >
        Create
      </Button>
    </Box>
  );
};

export default TaskForm;
