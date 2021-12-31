import { FaGraduationCap } from "react-icons/fa";
import lessons from "./lesson-list";

const navInfo = [
  {
    name: "lessons",
    display: "Practice Lessons",
    children: lessons,
    icon: <FaGraduationCap style={{ fontSize: 24 }} />,
  },
];

export default navInfo;
