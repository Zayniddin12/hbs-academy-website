type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[];

export type TClassName = TClass | TClass[];

export enum EAssignmentType {
  active = "active",
  completed = "completed",
  expired = "expired",
}

export interface IUser {
  id: string;
  full_name: string;
  phone_number: string;
  avatar: string;
  email: string;
  region: number;
  gender: string;
}

export interface ICourse {
  id: number;
  flow: {
    id: number;
    name: string;
    start: string;
    end: string;
  };
  details: {
    title: string;
    description: string;
    photo: string;
    lessons_count?: number;
    modules_count?: number;
    assignments_count?: number;
  };
  progress: number;
  start_at: string | null;
  modules_count: number;
  lessons_count: number;
  assignments_count: number;
  finished_modules_percentage: number;
  finished_modules_count: number;
  modules?: IModule[];
}

export interface IModule {
  id: number;
  lessons_count: number;
  details: {
    title: string;
    ordering: number;
  };
  percent: number;
  is_opened?: boolean;
}

export interface ILesson {
  id: number;
  viewed_time: number;
  completed: boolean;
  percent: number;
  details: {
    title: string;
    preview: string;
    video_duration: number;
    status: string;
    percent: number;
  };
}

export interface IAssignment {
  id: number;
  start_date: string;
  end_date: string;
  submitted: boolean;
  ball: number | null;
  details: {
    type: string;
    type_display: string;
    title: string;
    description: string;
    ball: number;
  };
  flow: {
    id: number;
    name: string;
  };
  module: {
    id: number;
    title: string;
  };
}

export interface ILessonSingle {
  id: number;
  viewed_time: number;
  completed: boolean;
  percent: number;
  is_saved: boolean;
  details: {
    title: string;
    description: string;
    video: string;
    preview: string;
    lesson_files: {
      id: number;
      file: string;
      ordering: number;
    }[];
    video_duration: number;
  };
  module: {
    id: number;
    name: string;
  };
}

export interface IDefaultResponseList {
  count?: number;
  next?: string;
  results?: any[];
}

export interface IAssignmentSingle {
  id: number;
  student_name: string;
  student_avatar: string;
  start_date: string;
  end_date: string;
  submitted: boolean;
  submitted_at: null;
  ball: null;
  test_started_at: null;
  test_finished_at: null;
  test_spent_time: null;
  test_stat_average_time: null;
  test_stat_min_time: null;
  test_stat_max_time: null;
  appraiser_name: null;
  assessment_at: null;
  details: {
    type: "writing" | "file" | "writing_and_file" | "test";
    type_display: string;
    title: string;
    description: string;
    ball: number;
    files: {
      id: string;
      file: string;
      file_type: string;
      file_type_display: string;
      size: number;
      size_display: string;
      file_name: string;
    }[];

    allocated_time: null;
    questions_count: null;
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
      photo: string;
    };
  };
  answer_text: null;
  answer_files: [];
  answer_questions: null;
  answer_questions_correct_count: null;
}

export interface ISavedLesson {
  id: number;
  details: {
    title: string;
    preview: string;
    video_duration: number;
  };
  percent: number;
  completed: false;
  is_saved: true;
  course_title: string;
  module_title: string;
}
