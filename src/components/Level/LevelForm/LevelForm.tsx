import { Box, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { createLevel, updateLevel } from "../../../config/API";

interface LevelData {
  _id: string;
  name: string;
  maxScore: number;
  time: number;
  description: string;
  isUpdate: boolean;
}

const LevelForm: React.FC<LevelData> = ({
  _id,
  name,
  maxScore,
  time,
  description,
  isUpdate,
}) => {
  const [formData, setFormData] = useState<LevelData>({
    _id,
    name: name || "",
    maxScore: maxScore || 0,
    time: time || 0,
    description: description || "",
    isUpdate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name == "maxScore" || name == "time" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isUpdate) {
        console.log(formData);
        const response = await updateLevel(
          {
            name: formData.name,
            maxScore: formData.maxScore,
            time: formData.time,
            description: formData.description,
          },
          _id
        );

      } else {
        const response = await createLevel({
          name: formData.name,
          maxScore: formData.maxScore,
          time: formData.time,
          description: formData.description,
        });

        console.log(response);
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField
          type="text"
          autoFocus
          label={"Name"}
          placeholder="e.g. Ice Braker"
          fullWidth
          onChange={handleChange}
          name="name"
          required
          value={formData.name}
        />
        <Stack direction={"row"} spacing={3} sx={{ my: 3 }}>
          <TextField
            type="number"
            label={"MaxScore"}
            fullWidth
            onChange={handleChange}
            name="maxScore"
            value={formData.maxScore}
            required
          />
          <TextField
            type="number"
            label={"Time"}
            fullWidth
            onChange={handleChange}
            name="time"
            value={formData.time}
            required
          />
        </Stack>
        <TextField
          type="text"
          fullWidth
          multiline
          rows={4}
          label="Description"
          onChange={handleChange}
          name="description"
          value={formData.description}
          required
        />
        <Button
          sx={{
            mt: 3,
          }}
          fullWidth
          variant="contained"
          type="submit"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default LevelForm;
