export interface ITask {
  title: string;
  score: number;
  levelID: string;
}

export interface IRLevel {
  data: [
    {
      _id: string;
      levelNumber: number;
      name: string;
      description: string;
      maxScore: string;
      task: ITask[];
      time: number;
    }
  ];
}

export interface ILevel {
  _id: string;
  levelNumber: number;
  name: string;
  description: string;
  maxScore: number;
  task: ITask[];
  time: number;
}
