import { LuMonitorPlay } from "react-icons/lu";
import { FaPuzzlePiece } from "react-icons/fa6";
import { MdEvent, MdOutlineQuiz } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { IconType } from "react-icons";
import { FaTasks } from "react-icons/fa";

type SidebarRoute = {
  name: string;
  icon: IconType;
  href: string;
};

const sidebarRoutes: SidebarRoute[] = [
  {
    name: "View Tasks",
    icon: FaTasks,
    href: "/view-tasks",
  },
  {
    name: "Play",
    icon: LuMonitorPlay,
    href: "/play-with-batch",
  },
  {
    name: "Puzzle run",
    icon: FaPuzzlePiece,
    href: "/assign-puzzle-coach",
  },
  {
    name: "Quiz",
    icon: MdOutlineQuiz,
    href: "/assign-quiz-coach",
  },
  {
    name: "Learn",
    icon: GoGoal,
    href: "/assign-homework-coach",
  },
  {
    name: "Events",
    icon: MdEvent,
    href: "/events",
  },
];

export default sidebarRoutes;
