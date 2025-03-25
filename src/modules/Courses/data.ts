export const course = {
  id: 1,
  title: "Международная торговля (Export&Import) ",
  banner: "/images/fake/fake.png",
  about_course:
    'Курс "Основы Трейдинга: Как делать деньги на Финансовых Рынках" представляет собой вводный и практически ориентированный обучающий курс, который поможет студентам овладеть основами трейдинга и научиться зарабатывать на финансовых рынках. ',
  start_date: "2023-10-10",
  end_date: "2023-10-30",
  modules: [
    {
      id: 1,
      title: "Введение в трейдинг",
      finished_percent: 81,
      lessons: [
        {
          finished_percent: 100,
          title: "Выбор стиля и сроков торговли",
          seconds: 12032,
          image: "/images/fake/fake.png",
        },
      ],
    },
  ],
  lessons: 16,
  assignments: 14,
};

export const lesson = {
  id: 1,
  title: "1. Выбор стиля и сроков торговли",
  about_lesson:
    "Этот урок фокусируется на том, как разработать собственную уникальную стратегию для успешного трейдинга. В ходе урока студенты узнают, как можно правильно определи",
  banner: "/images/fake/fake.png",
  module: {
    title: "Технический анализ",
  },
  files: [
    {
      name: "Список проверенных стратегий.pdf",
      type: "pdf",
      size: 148290,
    },
    {
      name: "Сборник личных нализов.mp4",
      type: "mp4",
      size: 2148290,
    },
  ],
  is_saved: false,
};

export const lessons = [
  {
    finished_percent: 100,
    title: "Выбор стиля и сроков торговли",
    seconds: 12032,
    image: "/images/fake/fake.png",
  },
  {
    finished_percent: 30,
    title: "Выбор стиля и сроков торговли",
    seconds: 12032,
    image: "/images/fake/fake.png",
  },
  {
    finished_percent: 0,
    title: "Выбор стиля и сроков торговли",
    seconds: 12032,
    image: "/images/fake/fake.png",
  },
];

export const comments = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Александр",
      avatar: "/images/fake/fake.png",
      is_verified: true,
    },
    created_at: "2021-10-10 10:10:10",
    body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
    replies: [
      {
        id: 1,
        user: {
          id: 1,
          name: "Александр",
          avatar: "/images/fake/fake.png",
          is_verified: true,
        },
        created_at: "2021-10-10 10:10:10",
        body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
      },
      {
        id: 2,
        user: {
          id: 1,
          name: "Александр",
          avatar: "/images/fake/fake.png",
          is_verified: true,
        },
        created_at: "2021-10-10 10:10:10",
        body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
      },
      {
        id: 3,
        user: {
          id: 1,
          name: "Александр",
          avatar: "/images/fake/fake.png",
          is_verified: true,
        },
        created_at: "2021-10-10 10:10:10",
        body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
      },
    ],
  },
  {
    id: 1,
    user: {
      id: 1,
      name: "Александр",
      avatar: "/images/fake/fake.png",
      is_verified: true,
    },
    created_at: "2021-10-10 10:10:10",
    body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
    replies: [],
  },
  {
    id: 1,
    user: {
      id: 1,
      name: "Александр",
      avatar: "/images/fake/fake.png",
      is_verified: true,
    },
    created_at: "2021-10-10 10:10:10",
    body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
    replies: [
      {
        id: 1,
        user: {
          id: 1,
          name: "Александр",
          avatar: "/images/fake/fake.png",
          is_verified: true,
        },
        created_at: "2021-10-10 10:10:10",
        body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
      },
      {
        id: 2,
        user: {
          id: 1,
          name: "Александр",
          avatar: "/images/fake/fake.png",
          is_verified: true,
        },
        created_at: "2021-10-10 10:10:10",
        body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
      },
      {
        id: 3,
        user: {
          id: 1,
          name: "Александр",
          avatar: "/images/fake/fake.png",
          is_verified: true,
        },
        created_at: "2021-10-10 10:10:10",
        body: "Очень полезный урок, особенно понравились аналогии которые приводились в качестве примеров. Вопросов никаких не осталось.",
      },
    ],
  },
];
