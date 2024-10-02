import { LuMonitorPlay } from "react-icons/lu";
import { FaPuzzlePiece } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
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
    href: "/play",
  },
  {
    name: "Puzzle run",
    icon: FaPuzzlePiece,
    href: "/puzzle-run",
  },
  {
    name: "Quiz",
    icon: MdOutlineQuiz,
    href: "/quiz",
  },
  {
    name: "Learn",
    icon: GoGoal,
    href: "/learn",
  },
];

export default sidebarRoutes;
