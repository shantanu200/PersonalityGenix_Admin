export interface Games {
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
