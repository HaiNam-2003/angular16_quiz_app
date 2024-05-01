export interface Data {
  status: string;
  data: QuizQuestion;
}

export interface QuizQuestion {
  question: string;
  choices: {
    [key: string]: string;
  };
  answer: string;
}
