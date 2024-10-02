import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  name: string;
  icon: IconType;
  href: string;
};

export const SidebarItem = ({ name, icon: Icon, href }: Props) => {
  return (
    <Link href={href}>
      <li className="flex items-center py-3 px-5 text-white hover:bg-gray-700 transition duration-200 font-light">
        <Icon className="w-5 h-5 mr-4" />
        <span>{name}</span>
      </li>
    </Link>
  );
};
