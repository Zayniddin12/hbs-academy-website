export interface ITestSingle {
  id: number;
  deadline_start_date: string;
  deadline_end_date: string;
  test_started_at: string;
  details: {
    id: number;
    title: string;
    description: string;
    ball: number;
    allocated_time: number;
    questions_count: number;
  };
  flow: {
    id: number;
    name: string;
  };
  module: {
    id: number;
    title: string;
    course: {
      id: number;
      title: string;
    };
  };
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  answer: any;
  details: {
    body: string;
    photo: string;
    video: null;
    answer_type: "single_answer" | "reorder" | "multiple_answer";
    answer_content: string;
    required_answers_count: number;
  };
  ball: number;
  answers: IAnswer[];
  is_answered: false;
}

export interface IAnswer {
  id: number;
  text: string;
  photo: null | string;
  is_selected: boolean;
}
