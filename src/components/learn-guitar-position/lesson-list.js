import L1_1 from "./components/Lesson1/SubLesson1/App";
import L1_2 from "./components/Lesson1/SubLesson2/App";
import L1_3 from "./components/Lesson1/SubLesson3/App";
import L1_4 from "./components/Lesson1/SubLesson4/App";
import L1_5 from "./components/Lesson1/SubLesson5/App";
import L1_6 from "./components/Lesson1/SubLesson6/App";

import L2_1 from "./components/Lesson2/SubLesson1/App";
import L2_2 from "./components/Lesson2/SubLesson2/App";
import L2_3 from "./components/Lesson2/SubLesson3/App";
import L2_4 from "./components/Lesson2/SubLesson4/App";

export const Lessons = {
  1: {
    1: L1_1,
    2: L1_2,
    3: L1_3,
    4: L1_4,
    5: L1_5,
    6: L1_6,
  },
  2: {
    1: L2_1,
    2: L2_2,
    3: L2_3,
    4: L2_4,
  },
};

const lessons = [
  {
    name: "lesson1",
    display: "Lesson 1",
    children: [
      {
        name: "lesson1-1",
        display: "High E",
        component: <L1_1 />,
        link: "/guitarx/lesson/1/1",
      },
      {
        name: "lesson1-2",
        display: "B",
        component: <L1_2 />,
        link: "/guitarx/lesson/1/2",
      },
      {
        name: "lesson1-3",
        display: "G",
        component: <L1_3 />,
        link: "/guitarx/lesson/1/3",
      },
      {
        name: "lesson1-4",
        display: "D",
        component: <L1_4 />,
        link: "/guitarx/lesson/1/4",
      },
      {
        name: "lesson1-5",
        display: "A",
        component: <L1_5 />,
        link: "/guitarx/lesson/1/5",
      },
      {
        name: "lesson1-6",
        display: "Low E",
        component: <L1_6 />,
        link: "/guitarx/lesson/1/6",
      },
    ],
  },
  {
    name: "lesson2",
    display: "Lesson 2",
    children: [
      {
        name: "lesson2-1",
        display: "1-2-3",
        component: <L2_1 />,
        link: "/guitarx/lesson/2/1",
      },
      {
        name: "lesson2-2",
        display: "4-5-6",
        component: <L2_2 />,
        link: "/guitarx/lesson/2/2",
      },
      {
        name: "lesson2-3",
        display: "2-3-4-5",
        component: <L2_3 />,
        link: "/guitarx/lesson/2/3",
      },
      {
        name: "lesson2-4",
        display: "1-2-3-4-5-6",
        component: <L2_4 />,
        link: "/guitarx/lesson/2/4",
      },
    ],
  },
];

export default lessons;
