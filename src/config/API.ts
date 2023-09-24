import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ILevel, IRLevel } from "../interfaces/Level";

interface User {
  data: {
    username: string;
    password: string;
    token: string;
  };
}

export async function loginUser(data: object): Promise<User> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "http://localhost:8080/admin/login",
    data,
  };

  try {
    const response: AxiosResponse<User> = await axios(config);
    if (response.status === 200) {
      localStorage.setItem("token", String(response.data.data.token));
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(token: string): Promise<User> {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "http://localhost:8080/admin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response: AxiosResponse<User> = await axios(config);
    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface Games {
  data: [
    {
      firstPlayer: {
        name: string;
        age: number;
        bid: number;
        paymentID: string;
        avatar: string;
        isGameCompleted: boolean;
        score: number;
        levelDetails: {
          id: string;
          tasks: string[];
          score: number;
          time: number;
        };
      };
      secondPlayer: {
        name: string;
        age: number;
        bid: number;
        paymentID: string;
        avatar: string;
        isGameCompleted: boolean;
        score: number;
        levelDetails: {
          id: string;
          tasks: string[];
          score: number;
          time: number;
        };
      };
      winner: string;
      turnPlayer: string;
    }
  ];
}

export async function getGames(page: number, limit: number): Promise<Games> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `http://localhost:8080/admin/games/?page=${page}&limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response: AxiosResponse<Games> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLevels(): Promise<IRLevel> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `http://localhost:8080/admin/levels`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response: AxiosResponse<IRLevel> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface LevelResponse {
  status: boolean;
  data: ILevel[] | string | ILevel;
}

export async function createLevel(data: any): Promise<LevelResponse> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `http://localhost:8080/level/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };
  try {
    const response: AxiosResponse<LevelResponse> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateLevel(
  data: any,
  id: string
): Promise<LevelResponse> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `http://localhost:8080/level/updateLevel/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };
  try {
    const response: AxiosResponse<LevelResponse> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLevelDetails(id: string): Promise<IRLevel> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `http://localhost:8080/level/getLevel/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response: AxiosResponse<IRLevel> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteLevelDetails(id: string): Promise<IRLevel> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `http://localhost:8080/level/deleteLevel/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response: AxiosResponse<IRLevel> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface ITask {
  _id: string;
  levelID: string;
  title: string;
  score: string;
}

interface TaskResponse{
  status: boolean;
  data: ITask[] | string | ILevel;
}

export async function createTask(data: any): Promise<TaskResponse> {
  const token = localStorage.getItem("token");
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `http://localhost:8080/task/create/${data[0]?.levelID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };
  try {
    const response: AxiosResponse<TaskResponse> = await axios(config);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
