export const assignments = [
  {
    title: "Основы Трейдинга:  Как делать деньги на Финансовых Рынках",
    description:
      "Составьте отчет о ваших результатах, выделите успешные стратегии и ошибки.",
    point: 10,
    given_point: null,
    deadline: "2023-10-20",
    is_saved: false,
    status: "active",
  },
  {
    title: "Основы Трейдинга:  Как делать деньги на Финансовых Рынках",
    description:
      "Составьте отчет о ваших результатах, выделите успешные стратегии и ошибки.",
    point: 10,
    given_point: 5,
    deadline: "2023-10-10",
    is_saved: false,
    status: "expired",
  },

  {
    title: "Основы Трейдинга:  Как делать деньги на Финансовых Рынках",
    description:
      "Составьте отчет о ваших результатах, выделите успешные стратегии и ошибки.",
    point: 10,
    given_point: 5,
    deadline: "2023-10-17",
    is_saved: false,
    status: "active",
  },
  {
    title: "Основы Трейдинга:  Как делать деньги на Финансовых Рынках",
    description:
      "Составьте отчет о ваших результатах, выделите успешные стратегии и ошибки.",
    point: 10,
    given_point: 5,
    deadline: "2023-10-11",
    is_saved: false,
    status: "completed",
  },
];

export const assignment = {
  title:
    "Определите разницу между долго срочным  и кратко срочным трейдингом. ",
  description:
    "В данном задании студентам предлагается объяснить основные концепции долгосрочного и краткосрочного трейдинга на финансовых рынках. Нужно выявить ключевые различия между этими двумя стратегиями и рассмотреть, какие преимущества и недостатки существуют у каждой из них. Задание не требует прикрепления файлов, но студенты могут использовать графики или таблицы для наглядной демонстрации концепций, если считают это необходимым.",
  point: 10,
  given_point: null,
  deadline: "2023-10-19",
  submitted_date: "2023-11-09 12:12:12",
  is_saved: false,
  is_submitted: false,
  type: "test",
  questions_count: 10,
  time: 15,
  attached_files: [
    {
      name: "file1.pdf",
      type: "pdf",
      size: 123434,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "file2.pdf",
      type: "pdf",
      size: 5423534,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "file3.pdf",
      type: "pdf",
      size: 123434,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ],
  module: {
    title: "Технический анализ",
  },
};

export const questions = [
  {
    id: 1,
    title: "Что такое лонг торговле?",
    type: "single",
    answer: null,
    is_answered: false,
    ball: false,
    answers: [
      {
        id: 1,
        title: "Продажа актива",
        value: "A",
        ball: true,
      },
      {
        id: 2,
        title: "Покупка актива",
        value: "B",
        ball: false,
      },
      {
        id: 3,
        title: "Покупка актива с намерением удерживать",
        value: "D",
        ball: false,
      },
      {
        id: 4,
        title: "Краткосрочная торговля",
        value: "C",
        ball: false,
      },
    ],
  },
  {
    id: 1,
    title: "Выберите изображение которая указывает на стакан маркета",
    type: "multi",
    answer: [2, 3],
    is_answered: true,
    ball: true,
    answers: [
      {
        id: 1,
        title: "Продажа актива",
        value: "A",
        ball: true,
      },
      {
        id: 2,
        title: "Покупка актива",
        value: "B",
        ball: false,
      },
      {
        id: 3,
        title: "Покупка актива с намерением удерживать",
        value: "D",
        ball: true,
      },
      {
        id: 4,
        title: "Краткосрочная торговля",
        value: "C",
        ball: false,
      },
    ],
  },
  {
    id: 1,
    title: "Выберите изображения которые   не подходить к трейдингу",
    type: "single-image",
    answer: 1,
    is_answered: true,
    ball: false,
    answers: [
      {
        id: 1,
        title: "Продажа актива",
        value: "A",
        ball: false,
      },
      {
        id: 2,
        title: "Покупка актива",
        value: "B",
        ball: false,
      },
      {
        id: 3,
        title: "Покупка актива с намерением удерживать",
        value: "D",
        ball: true,
      },
      {
        id: 4,
        title: "Краткосрочная торговля",
        value: "C",
        ball: false,
      },
    ],
  },
  {
    id: 1,
    title: "Выберите изображения которые   не подходить к трейдингу",
    type: "multi-image",
    answer: [1, 4],
    is_answered: true,
    ball: false,
    answers: [
      {
        id: 1,
        title: "Продажа актива",
        value: "A",
        ball: true,
      },
      {
        id: 2,
        title: "Покупка актива",
        value: "B",
        ball: true,
      },
      {
        id: 3,
        title: "Покупка актива с намерением удерживать",
        value: "D",
        ball: false,
      },
      {
        id: 4,
        title: "Краткосрочная торговля",
        value: "C",
        ball: false,
      },
    ],
  },
  {
    id: 1,
    title: "Выберите изображения которые   не подходить к трейдингу",
    type: "ordering",
    answer: "",
    is_answered: false,
    ball: false,
    answers: [
      {
        id: 1,
        title: "Продажа актива",
        value: "A",
        ball: false,
      },
      {
        id: 2,
        title: "Покупка актива",
        value: "B",
        ball: false,
      },
      {
        id: 3,
        title: "Покупка актива с намерением удерживать",
        value: "D",
        ball: false,
      },
      {
        id: 4,
        title: "Краткосрочная торговля",
        value: "C",
        ball: false,
      },
    ],
  },
];

export const single = {
  id: 89,
  deadline_start_date: "2023-11-05",
  deadline_end_date: "2023-11-14",
  test_started_at: "2023-11-13T14:18:29Z",
  details: {
    id: 34,
    title: "Test3",
    description: "Test3",
    ball: 90,
    allocated_time: 6000,
    questions_count: 6,
  },
  flow: {
    id: 6,
    name: "Nov 1",
  },
  module: {
    id: 25,
    title: "Test module",
    course: {
      id: 8,
      title: "О биржах торгового курса",
    },
  },
  questions: [
    {
      id: 62,
      details: {
        body: "What are the order of colors in rainbow?",
        photo: null,
        video: null,
        answer_type: "reorder",
        answer_content: "text",
        required_answers_count: 6,
      },
      answers: [
        {
          id: 140,
          text: "orange",
          photo: null,
          is_selected: null,
        },
        {
          id: 142,
          text: "green",
          photo: null,
          is_selected: null,
        },
        {
          id: 143,
          text: "blue",
          photo: null,
          is_selected: null,
        },
        {
          id: 139,
          text: "red",
          photo: null,
          is_selected: null,
        },
        {
          id: 141,
          text: "yellow",
          photo: null,
          is_selected: null,
        },
        {
          id: 144,
          text: "indigo",
          photo: null,
          is_selected: null,
        },
      ],
      is_answered: true,
    },
    {
      id: 63,
      details: {
        body: "What do you feel when you watch this video?",
        photo: null,
        video:
          "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/industrial_society_and_its_future.mp4",
        answer_type: "single_answer",
        answer_content: "photo",
        required_answers_count: 1,
      },
      answers: [
        {
          id: 130,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/Skull-Emoji.png",
          is_selected: false,
        },
        {
          id: 128,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/istockphoto-1124532572-612x612.jpg",
          is_selected: true,
        },
        {
          id: 129,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/ios-10-shrug-emoji.jpeg",
          is_selected: false,
        },
        {
          id: 127,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/angry-face-emoji-2048x2048-tvcurhfn.png",
          is_selected: false,
        },
      ],
      is_answered: true,
    },
    {
      id: 64,
      details: {
        body: "What is the capital of Uzbekistan",
        photo:
          "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/map-of-uzbekistan.jpg",
        video: null,
        answer_type: "single_answer",
        answer_content: "text",
        required_answers_count: 1,
      },
      answers: [
        {
          id: 121,
          text: "Surkhandarya",
          photo: null,
          is_selected: false,
        },
        {
          id: 120,
          text: "Samarkand",
          photo: null,
          is_selected: false,
        },
        {
          id: 119,
          text: "Tashkent",
          photo: null,
          is_selected: true,
        },
        {
          id: 122,
          text: "Bukhara",
          photo: null,
          is_selected: false,
        },
      ],
      is_answered: true,
    },
    {
      id: 65,
      details: {
        body: "What are the 3 colors of traffic light",
        photo: null,
        video: null,
        answer_type: "multiple_answer",
        answer_content: "photo",
        required_answers_count: 3,
      },
      answers: [
        {
          id: 133,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/Screenshot_from_2023-11-03_17-39-02.png",
          is_selected: true,
        },
        {
          id: 131,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/red-color-solid-background-1920x1080.png",
          is_selected: false,
        },
        {
          id: 132,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/Screenshot_from_2023-11-03_17-37-03.png",
          is_selected: true,
        },
        {
          id: 134,
          text: null,
          photo:
            "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/Screenshot_from_2023-11-03_17-37-59.png",
          is_selected: true,
        },
      ],
      is_answered: true,
    },
    {
      id: 66,
      details: {
        body: "What do you feel when you watch this video?",
        photo: null,
        video:
          "https://hbs-academy-dev.uicgroup.tech/media/2023/11/03/industrial_society_and_its_future.mp4",
        answer_type: "single_answer",
        answer_content: "text",
        required_answers_count: 1,
      },
      answers: [
        {
          id: 123,
          text: "Anger",
          photo: null,
          is_selected: false,
        },
        {
          id: 125,
          text: "Idk",
          photo: null,
          is_selected: true,
        },
        {
          id: 124,
          text: "Joy",
          photo: null,
          is_selected: false,
        },
        {
          id: 126,
          text: "This is a very long text. This is a very long text. This is a very long text. This is a very long text.",
          photo: null,
          is_selected: false,
        },
      ],
      is_answered: true,
    },
    {
      id: 67,
      details: {
        body: "What are the 3 colors of traffic light",
        photo: null,
        video: null,
        answer_type: "multiple_answer",
        answer_content: "text",
        required_answers_count: 3,
      },
      answers: [
        {
          id: 135,
          text: "Red",
          photo: null,
          is_selected: false,
        },
        {
          id: 137,
          text: "Black",
          photo: null,
          is_selected: false,
        },
        {
          id: 138,
          text: "Yellow",
          photo: null,
          is_selected: false,
        },
        {
          id: 136,
          text: "Green",
          photo: null,
          is_selected: false,
        },
      ],
      is_answered: false,
    },
  ],
};
