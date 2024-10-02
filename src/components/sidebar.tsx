import sidebarRoutes from "@/constants/sidebar-routes";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { Button } from "./button";

type Props = {};

export const Sidebar = (props: Props) => {
  return (
    <aside className="h-full w-64 bg-black-secondary ">
      <div className="py-6">
        <div className="relative w-full h-28">
          <Link href="/">
            <Image
              src="/chessnchunks-logo.svg"
              alt="Chess n Chunks"
              layout="fill"
              objectFit="contain"
              loading="lazy"
              quality={100}
            />
          </Link>
        </div>
      </div>

      <nav className="space-y-2 mt-8">
        {sidebarRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            name={route.name}
            icon={route.icon}
            href={route.href}
          />
        ))}
      </nav>

      <div className="px-5 mt-8">
        <Button>Subscribe</Button>
      </div>
    </aside>
  );
};
