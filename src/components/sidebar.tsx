"use client";

import sidebarRoutes from "@/constants/sidebar-routes";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const filteredRoutes = sidebarRoutes.filter((route) => {
    
    if (session?.user?.role === "STUDENT" as "student") {
      return !["Play", "Puzzle run", "Quiz"].includes(route.name);
    }
    return true; 
  });


  const isHideSidebar = [
    "/sign-up",
    "/login",
    "/otp-verification",
    "/invitation",
  ].includes(pathname);

  if (isHideSidebar) return null;

  return (
    <aside className="h-screen w-64 bg-black-secondary flex flex-col justify-between">
      {/* Logo */}
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

      {/* Navigation */}
      <nav className="space-y-2 mt-8 flex-grow">
        {filteredRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            name={route.name}
            icon={route.icon}
            href={route.href}
          />
        ))}
      </nav>

      {/* Subscribe Button */}
      <div className="px-5 mb-6">
        <Link href="/pricing-table">
          <Button type="submit">Subscribe</Button>
        </Link>
      </div>
    </aside>
  );
};
